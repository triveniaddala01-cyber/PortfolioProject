import { useEffect, useState } from "react";
import Admin from "./Admin";
const API_URL =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://portfolioproject-qc8y.onrender.com";
console.log("API URL:", API_URL);

function App() {
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  fetch(`${API_URL}/skills`)
    .then((response) => response.json())
    .then((data) => setSkills(data))
    .catch((error) => console.error("Error loading skills:", error));

  fetch(`${API_URL}/about`)
    .then((response) => response.json())
    .then((data) => setAbout(data))
    .catch((error) => console.error("Error loading about:", error));

  fetch(`${API_URL}/projects`)
    .then((response) => response.json())
    .then((data) => setProjects(data))
    .catch((error) => console.error("Error loading projects:", error));
}, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-5 bg-gray-900">
          {/* Production deployment update */}
        <h1 className="text-2xl font-bold text-blue-500">
          Triveni
        </h1>

        <div className="flex gap-6">
          <a href="#home" className="hover:text-blue-400">Home</a>
          <a href="#about" className="hover:text-blue-400">About</a>
          <a href="#skills" className="hover:text-blue-400">Skills</a>
          <a href="#projects" className="hover:text-blue-400">Projects</a>
          <a href="#contact" className="hover:text-blue-400">Contact</a>
        </div>
      </nav>

      {/* Home */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6"
      >
        <p className="text-blue-400 text-lg mb-3">
          Hello, I'm
        </p>

        <h2 className="text-5xl font-bold mb-4">
          Triveni
        </h2>

        <h3 className="text-2xl text-gray-300 mb-3">
          B.Tech – Artificial Intelligence and Data Science
        </h3>

        <p className="text-blue-400 text-lg mb-6">
          Aspiring Software Developer | AI & Data Science Enthusiast
        </p>

        <p className="max-w-2xl text-gray-400 text-lg mb-8">
          I am passionate about software development, artificial
          intelligence, and building practical technology solutions.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">

          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            View My Projects
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold"
          >
            View Resume
          </a>

          <a
            href="#contact"
            className="border border-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Contact Me
          </a>

          <a
            href="https://github.com/triveniaddala01-cyber"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/triveni-addala-30568837b"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold"
          >
            LinkedIn
          </a>

        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-8 bg-gray-900">

        <h2 className="text-4xl font-bold text-center mb-4">
          About Me
        </h2>

        <p className="text-center text-blue-400 mb-10">
          Artificial Intelligence & Data Science
        </p>

        <div className="max-w-3xl mx-auto text-center text-gray-300">

          {about && (
            <>
              <p className="text-lg leading-8">
                {about?.intro || "Loading..."}
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-5">

                <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    Education
                  </h3>

                  <p className="text-gray-300">
                    {about.education}
                  </p>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    Career Goal
                  </h3>

                  <p className="text-gray-300">
                    {about.career_goal}
                  </p>
                </div>

              </div>
            </>
          )}

        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-8 bg-gray-950">

        <h2 className="text-4xl font-bold text-center mb-4">
          Technical Skills
        </h2>

        <p className="text-center text-gray-400 mb-10">
          Technologies and tools I use to build practical software solutions.
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">

          {skills.map((skill) => (

            <div
              key={skill.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center hover:border-blue-500 hover:-translate-y-1 transition duration-300"
            >

              <p className="font-semibold text-gray-200">
                {skill.name}
              </p>

              {skill.category && (
                <p className="text-sm text-blue-400 mt-2">
                  {skill.category}
                </p>
              )}

            </div>

          ))}

        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-8 bg-gray-900">

        <h2 className="text-4xl font-bold text-center mb-10">
          My Projects
        </h2>

        <div className="max-w-3xl mx-auto">

          <p className="text-blue-400 text-center mb-2">
            Featured Work
          </p>

          {projects.map((project) => (

            <div
              key={project.id}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 mb-6"
            >

              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                {project.title}
              </h3>

              <p className="text-gray-300 leading-7 mb-5">
                {project.description}
              </p>

              <div className="mt-4">

                <p className="text-sm text-blue-400 font-semibold mb-1">
                  Technologies Used
                </p>

                <p className="text-gray-400">
                  {project.technologies}
                </p>

              </div>

              <div className="flex gap-3 mt-5">

                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"
                  >
                    GitHub
                  </a>
                )}

                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                  >
                    Live Demo
                  </a>
                )}

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-8 bg-gray-900">

        <h2 className="text-4xl font-bold text-center mb-4">
          Get In Touch
        </h2>

        <p className="text-center text-gray-400 mb-4 max-w-xl mx-auto">
          I am open to internship opportunities, software development roles,
          and collaborations. Feel free to reach out to me.
        </p>

        <a
          href="mailto:triveniaddala4@gmail.com"
          className="block text-center text-blue-400 hover:text-blue-300 mb-8"
        >
          📧 triveniaddala4@gmail.com
        </a>

        <form
          className="max-w-xl mx-auto space-y-5"
          onSubmit={async (e) => {

            e.preventDefault();

            const formData = new FormData(e.target);

            const response = await fetch(
              `${API_URL}/contact`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  message: formData.get("message"),
                }),
              }
            );

            if (response.ok) {
              alert("Message sent successfully!");
              e.target.reset();
            } else {
              alert("Failed to send message.");
            }

          }}
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 focus:border-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 focus:border-blue-500 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 focus:border-blue-500 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
          >
            Send Message
          </button>

        </form>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-400">
        <p>© 2026 Triveni. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
