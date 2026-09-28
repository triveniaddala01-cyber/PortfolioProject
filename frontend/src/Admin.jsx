import { useEffect, useState } from "react";

function Admin() {
  const [loggedIn, setLoggedIn] = useState(
  localStorage.getItem("adminLoggedIn") === "true"
);

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [about, setAbout] = useState(null);
  const [aboutName, setAboutName] = useState("");
  const [aboutIntro, setAboutIntro] = useState("");
  const [aboutEducation, setAboutEducation] = useState("");
  const [aboutCareerGoal, setAboutCareerGoal] = useState("");
  const [editingProject, setEditingProject] = useState(null);

  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState("");

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTechnologies, setProjectTechnologies] = useState("");
  const [projectGithub, setProjectGithub] = useState("");
  const [projectLive, setProjectLive] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/skills")
      .then((response) => response.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
    fetch("http://127.0.0.1:8000/about")
  .then((response) => response.json())
  .then((data) => {
    setAbout(data);
    setAboutName(data.name);
    setAboutIntro(data.intro);
    setAboutEducation(data.education || "");
    setAboutCareerGoal(data.career_goal || "");
  })
  .catch((error) => console.error(error));
    fetch("http://127.0.0.1:8000/contact")
  .then((response) => response.json())
  .then((data) => setMessages(data))
  .catch((error) => console.error(error));
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await fetch(
      "http://127.0.0.1:8000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      }
    );

    const data = await response.json();

    if (data.message === "Login successful") {
  setLoggedIn(true);
  localStorage.setItem("adminLoggedIn", "true");
} else {
      alert("Invalid email or password");
    }
  }

  async function addSkill(e) {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/skills",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: skillName,
          category: skillCategory,
        }),
      }
    );

    if (response.ok) {
      const newSkill = await response.json();

      setSkills([...skills, newSkill]);
      setSkillName("");
      setSkillCategory("");
    }
  }

  async function deleteSkill(id) {
    const response = await fetch(
      `http://127.0.0.1:8000/skills/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setSkills(
        skills.filter((skill) => skill.id !== id)
      );
    }
  }

  async function addProject(e) {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/projects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,
          description: projectDescription,
          technologies: projectTechnologies,
          github_link: projectGithub,
          live_link: projectLive,
        }),
      }
    );

    if (response.ok) {
      const newProject = await response.json();

      setProjects([...projects, newProject]);

      setProjectTitle("");
      setProjectDescription("");
      setProjectTechnologies("");
      setProjectGithub("");
      setProjectLive("");
    }
  }
  async function updateProject(e) {
  e.preventDefault();

  const response = await fetch(
    `http://127.0.0.1:8000/projects/${editingProject.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: projectTitle,
        description: projectDescription,
        technologies: projectTechnologies,
        github_link: projectGithub,
        live_link: projectLive,
      }),
    }
  );

  if (response.ok) {
    const updatedProject = await response.json();

    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );

    setEditingProject(null);
    setProjectTitle("");
    setProjectDescription("");
    setProjectTechnologies("");
    setProjectGithub("");
    setProjectLive("");
  }
}
async function updateAbout(e) {
  e.preventDefault();

  const response = await fetch(
    "http://127.0.0.1:8000/about",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: aboutName,
        intro: aboutIntro,
        education: aboutEducation,
        career_goal: aboutCareerGoal,
      }),
    }
  );

  if (response.ok) {
    const updatedAbout = await response.json();

    setAbout(updatedAbout);

    alert("About section updated successfully!");
  }
}

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">

          <h1 className="text-3xl font-bold text-blue-400 mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              required
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <div className="flex justify-between items-center">

  <h1 className="text-4xl font-bold text-blue-400">
    Admin Dashboard
  </h1>

  <button
    onClick={() => {
  setLoggedIn(false);
  localStorage.removeItem("adminLoggedIn");
}}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
  >
    Logout
  </button>

</div>

      <p className="text-gray-400 mt-2 mb-8">
        Manage your Portfolio CMS
      </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <p className="text-gray-400">Skills</p>
    <h2 className="text-3xl font-bold text-blue-400 mt-2">
      {skills.length}
    </h2>
  </div>

  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <p className="text-gray-400">Projects</p>
    <h2 className="text-3xl font-bold text-green-400 mt-2">
      {projects.length}
    </h2>
  </div>

  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <p className="text-gray-400">Messages</p>
    <h2 className="text-3xl font-bold text-yellow-400 mt-2">
      {messages.length}
    </h2>
  </div>

</div>

      {/* SKILLS */}

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-xl">

        <h2 className="text-2xl font-bold mb-2">
          Skills
        </h2>

        <p className="text-gray-400 mb-5">
          Add and manage your skills.
        </p>

        <form onSubmit={addSkill} className="space-y-3">

          <input
            type="text"
            placeholder="Skill Name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <input
            type="text"
            placeholder="Category"
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg"
          >
            Add Skill
          </button>

        </form>

        <div className="mt-6 space-y-2">

          {skills.map((skill) => (

            <div
              key={skill.id}
              className="bg-gray-950 border border-gray-700 rounded-lg p-3 flex justify-between items-center"
            >

              <div>
                <p className="font-semibold">
                  {skill.name}
                </p>

                <p className="text-gray-400 text-sm">
                  {skill.category}
                </p>
              </div>

              <button
                onClick={() => deleteSkill(skill.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
              >
                Delete
              </button>

            </div>

          ))}

        </div>
          {/* ABOUT */}

<div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-xl mb-8">

  <h2 className="text-2xl font-bold mb-2">
    About
  </h2>

  <p className="text-gray-400 mb-5">
    Update your portfolio About section.
  </p>

  <form onSubmit={updateAbout} className="space-y-3">

    <input
      type="text"
      placeholder="Your Name"
      value={aboutName}
      onChange={(e) => setAboutName(e.target.value)}
      required
      className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
    />

    <textarea
      placeholder="Introduction"
      value={aboutIntro}
      onChange={(e) => setAboutIntro(e.target.value)}
      required
      rows="4"
      className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
    />

    <input
      type="text"
      placeholder="Education"
      value={aboutEducation}
      onChange={(e) => setAboutEducation(e.target.value)}
      className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
    />

    <textarea
      placeholder="Career Goal"
      value={aboutCareerGoal}
      onChange={(e) => setAboutCareerGoal(e.target.value)}
      rows="3"
      className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
    />

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
    >
      Update About
    </button>

  </form>

</div>

      </div>

      {/* PROJECTS */}

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-xl mt-8">

        <h2 className="text-2xl font-bold mb-2">
          Projects
        </h2>

        <p className="text-gray-400 mb-5">
          Add and manage your projects.
        </p>

        <form
  onSubmit={editingProject ? updateProject : addProject}
  className="space-y-3"
>

          <input
            type="text"
            placeholder="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <textarea
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
            rows="4"
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <input
            type="text"
            placeholder="Technologies"
            value={projectTechnologies}
            onChange={(e) => setProjectTechnologies(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <input
            type="text"
            placeholder="GitHub Link"
            value={projectGithub}
            onChange={(e) => setProjectGithub(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <input
            type="text"
            placeholder="Live Project Link"
            value={projectLive}
            onChange={(e) => setProjectLive(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700"
          />

          <button
  type="submit"
  className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg"
>
  {editingProject ? "Update Project" : "Add Project"}
</button>

        </form>

        <div className="mt-6 space-y-3">

          {projects.map((project) => (

  <div
    key={project.id}
    className="bg-gray-950 border border-gray-700 rounded-lg p-4 flex justify-between items-center"
  >

    <div>

      <h3 className="font-bold text-lg">
        {project.title}
      </h3>

      <p className="text-gray-400 text-sm mt-1">
        {project.description}
      </p>

      <p className="text-blue-400 text-sm mt-2">
        {project.technologies}
      </p>
        <button
  onClick={() => {
    setEditingProject(project);
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setProjectTechnologies(project.technologies || "");
    setProjectGithub(project.github_link || "");
    setProjectLive(project.live_link || "");
  }}
  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg mr-2"
>
  Edit
</button>

    </div>

    <button
      onClick={async () => {
        const response = await fetch(
          `http://127.0.0.1:8000/projects/${project.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setProjects(
            projects.filter(
              (item) => item.id !== project.id
            )
          );
        }
      }}
      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
    >
      Delete
    </button>

  </div>

))}

        </div>

      </div>
        {/* MESSAGES */}

<div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-xl mt-8">

  <h2 className="text-2xl font-bold mb-2">
    Contact Messages
  </h2>

  <p className="text-gray-400 mb-5">
    Messages received from your portfolio.
  </p>

  <div className="space-y-3">

    {messages.map((message) => (

  <div
    key={message.id}
    className="bg-gray-950 border border-gray-700 rounded-lg p-4"
  >

    <h3 className="font-bold">
      {message.name}
    </h3>

    <p className="text-blue-400 text-sm mt-1">
      {message.email}
    </p>

    <p className="text-gray-300 mt-2">
      {message.message}
    </p>

    <button
      onClick={async () => {

        const response = await fetch(
          `http://127.0.0.1:8000/contact/${message.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setMessages(
            messages.filter((item) => item.id !== message.id)
          );
        }

      }}
      className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
    >
      Delete
    </button>

  </div>

))}

  </div>

</div>

    </div>
  );
}

export default Admin;