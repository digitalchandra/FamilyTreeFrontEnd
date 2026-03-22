import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";

export default function Home() {
  const projects = [
    {
      title: "ConvertTool.io",
      description:
        "Online image conversion platform with tools like PNG to JPG, JPG to PNG, and WEBP converter.",
      link: "https://converttool.io",
      tag: "SaaS Tool"
    },
    {
      title: "EDigitalClass",
      description:
        "Digital education platform providing online courses and technology learning.",
      link: "https://edigitalclass.com",
      tag: "Education"
    },
    {
      title: "Family Tree System",
      description:
        "Interactive family tree application with authentication and role-based management.",
      link: "/login",
      tag: "Web App"
    }
  ];

  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Hi, I'm <span className="text-indigo-600">Chandra Shrestha</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Full-stack developer building SaaS tools, education platforms,
          and scalable web applications using React, Spring Boot and modern technologies.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <Link
            to="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Family Tree Login
          </Link>

          <a
            href="https://github.com"
            className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            <FaGithub />
            GitHub
          </a>

        </div>

      </section>


      {/* PROJECT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-12">
          My Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
            >

              <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                {project.tag}
              </span>

              <h3 className="text-xl font-semibold mt-4">
                {project.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {project.description}
              </p>

              <a
                href={project.link}
                className="flex items-center gap-2 text-indigo-600 mt-4 hover:underline"
              >
                Visit Project
                <FaArrowRight />
              </a>

            </div>
          ))}

        </div>

      </section>


      {/* SKILLS SECTION */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">
            Technologies I Use
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            {[
              "React",
              "Spring Boot",
              "Node.js",
              "MySQL",
              "Tailwind CSS",
              "WordPress",
              "Java",
              "Python"
            ].map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 px-5 py-2 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>

      </section>


      {/* CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Let's Build Something Together
        </h2>

        <p className="text-gray-600 mb-8">
          I'm interested in SaaS, web development, and technology projects.
        </p>

        <a
          href="mailto:your@email.com"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Contact Me
        </a>

      </section>

    </div>
  );
}