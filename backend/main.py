from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base, SessionLocal
from models import Project, About, Skill, Message, User
from schemas import (
    ProjectCreate,
    ProjectResponse,
    AboutCreate,
    AboutResponse,
    SkillCreate,
    SkillResponse,
    MessageCreate,
    LoginRequest
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio CMS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://portfolio-project-ld5x.vercel.app"
    ],
    allow_origin_regex=r"https://portfolio-project-ld5x-[a-z0-9]+-triveni10\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {
        "message": "Portfolio CMS API is running Successfully"
    }


@app.post("/projects", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    new_project = Project(**project.model_dump())

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


@app.get("/projects", response_model=list[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@app.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    existing_project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if existing_project is None:
        return {"error": "Project not found"}

    existing_project.title = project.title
    existing_project.description = project.description
    existing_project.technologies = project.technologies
    existing_project.github_link = project.github_link
    existing_project.live_link = project.live_link

    db.commit()
    db.refresh(existing_project)

    return existing_project


@app.delete("/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    existing_project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if existing_project is None:
        return {"error": "Project not found"}

    db.delete(existing_project)
    db.commit()

    return {
        "message": "Project deleted successfully"
    }
@app.get("/about", response_model=AboutResponse)
def get_about(db: Session = Depends(get_db)):
    about = db.query(About).first()

    if about is None:
        return {
            "id": 0,
            "name": "",
            "intro": "",
            "education": None,
            "career_goal": None
        }

    return about


@app.put("/about", response_model=AboutResponse)
def update_about(
    about_data: AboutCreate,
    db: Session = Depends(get_db)
):
    about = db.query(About).first()

    if about is None:
        about = About(**about_data.model_dump())
        db.add(about)
    else:
        about.name = about_data.name
        about.intro = about_data.intro
        about.education = about_data.education
        about.career_goal = about_data.career_goal

    db.commit()
    db.refresh(about)

    return about
@app.post("/skills", response_model=SkillResponse)
def create_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db)
):
    new_skill = Skill(**skill.model_dump())

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


@app.get("/skills", response_model=list[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()


@app.put("/skills/{skill_id}", response_model=SkillResponse)
def update_skill(
    skill_id: int,
    skill: SkillCreate,
    db: Session = Depends(get_db)
):
    existing_skill = db.query(Skill).filter(
        Skill.id == skill_id
    ).first()

    if existing_skill is None:
        return {"error": "Skill not found"}

    existing_skill.name = skill.name
    existing_skill.category = skill.category

    db.commit()
    db.refresh(existing_skill)

    return existing_skill


@app.delete("/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    existing_skill = db.query(Skill).filter(
        Skill.id == skill_id
    ).first()

    if existing_skill is None:
        return {"error": "Skill not found"}

    db.delete(existing_skill)
    db.commit()

    return {
        "message": "Skill deleted successfully"
    }
@app.post("/contact")
def create_message(
    message: MessageCreate,
    db: Session = Depends(get_db)
):
    new_message = Message(**message.model_dump())

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return {
        "message": "Message sent successfully"
    }
@app.get("/contact")
def get_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).all()
    return messages
@app.delete("/contact/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db)
):
    message = db.query(Message).filter(
        Message.id == message_id
    ).first()

    if not message:
        return {"message": "Message not found"}

    db.delete(message)
    db.commit()

    return {
        "message": "Message deleted successfully"
    }
@app.post("/auth/login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()

    if not user or user.password != login_data.password:
        return {"message": "Invalid email or password"}

    return {
        "message": "Login successful",
        "email": user.email
    }
@app.put("/auth/reset-password")
def reset_password(
    user_data: LoginRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if not user:
        return {"message": "User not found"}

    user.password = user_data.password
    db.commit()

    return {
        "message": "Password updated successfully"
    }
@app.post("/auth/register")
def register_user(
    user_data: LoginRequest,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        return {"message": "User already exists"}

    new_user = User(
        email=user_data.email,
        password=user_data.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Admin account created successfully"
    }
@app.post("/skills")
def create_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db)
):
    new_skill = Skill(**skill.model_dump())

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill
@app.delete("/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()

    if not skill:
        return {"message": "Skill not found"}

    db.delete(skill)
    db.commit()

    return {"message": "Skill deleted successfully"}
@app.delete("/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        return {"message": "Project not found"}

    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}
@app.put("/projects/{project_id}")
def update_project(
    project_id: int,
    project_data: ProjectCreate,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        return {"message": "Project not found"}

    project.title = project_data.title
    project.description = project_data.description
    project.technologies = project_data.technologies
    project.github_link = project_data.github_link
    project.live_link = project_data.live_link

    db.commit()
    db.refresh(project)

    return project