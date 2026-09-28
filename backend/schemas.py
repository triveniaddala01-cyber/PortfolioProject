from pydantic import BaseModel, ConfigDict


class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: str | None = None
    github_link: str | None = None
    live_link: str | None = None


class ProjectResponse(ProjectCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


class AboutCreate(BaseModel):
    name: str
    intro: str
    education: str | None = None
    career_goal: str | None = None


class AboutResponse(AboutCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
class SkillCreate(BaseModel):
    name: str
    category: str | None = None


class SkillResponse(SkillCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
class MessageCreate(BaseModel):
    name: str
    email: str
    message: str
class LoginRequest(BaseModel):
    email: str
    password: str