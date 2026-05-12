from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
import shutil
from pathlib import Path

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
POSTS_FILE = BASE_DIR / "posts.json"
COURSES_FILE = BASE_DIR / "courses.json"
UPLOAD_DIR = PROJECT_ROOT / "public" / "modules"

# Ensure upload directory exists
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Initial data
INITIAL_POSTS = [
    {
        "id": 1,
        "title": "New Interdisciplinary Research Center Opens Its Doors to Faculty and Students",
        "description": "The new facility brings together experts from engineering, bio-sciences, and data analytics to tackle some of the world's most pressing challenges.",
        "category": "My Posts",
        "date": "May 8, 2026",
        "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200&h=800"
    }
]

INITIAL_COURSES = [
    {
        "id": 1,
        "title": "Prompt Engineering",
        "description": "Learn the art of crafting effective prompts for Large Language Models (LLMs) to achieve superior results in various tasks.",
        "level": "Intermediate",
        "duration": "8 Weeks",
        "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600",
        "modules": [
            {"id": 1, "title": "Module 1: Introduction to LLMs", "file": "Module 1.pptx"},
            {"id": 2, "title": "Module 2: Basics of Prompting", "file": "Module 2.pptx"}
        ],
        "assignments": [
            {"id": 1, "title": "Assignment 1: Zero-Shot vs Few-Shot Analysis", "description": "Compare performance...", "dueDate": "Week 2"}
        ]
    }
]

def load_data(file_path, initial_data):
    if not file_path.exists():
        with open(file_path, "w") as f:
            json.dump(initial_data, f, indent=4)
        return initial_data
    with open(file_path, "r") as f:
        return json.load(f)

def save_data(file_path, data):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

class Post(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    category: str
    date: str
    image: str

class CourseModule(BaseModel):
    id: int
    title: str
    file: str

class CourseAssignment(BaseModel):
    id: int
    title: str
    description: str
    dueDate: str

class Course(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    level: str
    duration: str
    image: str
    modules: Optional[List[CourseModule]] = []
    assignments: Optional[List[CourseAssignment]] = []

class LoginRequest(BaseModel):
    password: str

# Posts Endpoints
@app.get("/posts", response_model=List[Post])
async def get_posts():
    return load_data(POSTS_FILE, INITIAL_POSTS)

@app.post("/posts", response_model=Post)
async def create_post(post: Post):
    posts = load_data(POSTS_FILE, INITIAL_POSTS)
    new_id = max([p["id"] for p in posts], default=0) + 1
    post_dict = post.dict()
    post_dict["id"] = new_id
    posts.append(post_dict)
    save_data(POSTS_FILE, posts)
    return post_dict

@app.put("/posts/{post_id}", response_model=Post)
async def update_post(post_id: int, updated_post: Post):
    posts = load_data(POSTS_FILE, INITIAL_POSTS)
    for i, p in enumerate(posts):
        if p["id"] == post_id:
            updated_dict = updated_post.dict()
            updated_dict["id"] = post_id
            posts[i] = updated_dict
            save_data(POSTS_FILE, posts)
            return updated_dict
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/posts/{post_id}")
async def delete_post(post_id: int):
    posts = load_data(POSTS_FILE, INITIAL_POSTS)
    new_posts = [p for p in posts if p["id"] != post_id]
    save_data(POSTS_FILE, new_posts)
    return {"message": "Post deleted"}

# Courses Endpoints
@app.get("/courses", response_model=List[Course])
async def get_courses():
    return load_data(COURSES_FILE, INITIAL_COURSES)

@app.post("/courses", response_model=Course)
async def create_course(course: Course):
    courses = load_data(COURSES_FILE, INITIAL_COURSES)
    new_id = max([c["id"] for c in courses], default=0) + 1
    course_dict = course.dict()
    course_dict["id"] = new_id
    courses.append(course_dict)
    save_data(COURSES_FILE, courses)
    return course_dict

@app.put("/courses/{course_id}", response_model=Course)
async def update_course(course_id: int, updated_course: Course):
    courses = load_data(COURSES_FILE, INITIAL_COURSES)
    for i, c in enumerate(courses):
        if c["id"] == course_id:
            updated_dict = updated_course.dict()
            updated_dict["id"] = course_id
            courses[i] = updated_dict
            save_data(COURSES_FILE, courses)
            return updated_dict
    raise HTTPException(status_code=404, detail="Course not found")

@app.delete("/courses/{course_id}")
async def delete_course(course_id: int):
    courses = load_data(COURSES_FILE, INITIAL_COURSES)
    new_courses = [c for c in courses if c["id"] != course_id]
    save_data(COURSES_FILE, new_courses)
    return {"message": "Course deleted"}

# File Upload Endpoint
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"filename": file.filename, "url": f"/modules/{file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
async def login(req: LoginRequest):
    if req.password == "admin123":
        return {"status": "success", "token": "mock-token", "user": {"role": "admin", "username": "admin"}}
    raise HTTPException(status_code=401, detail="Invalid password")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
