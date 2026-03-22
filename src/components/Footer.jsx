import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-4">Chandra Shrestha</h2>
            <p className="text-gray-400 text-sm">
              Full-stack developer building SaaS products, tools and
              scalable web applications.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">

              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Projects</li>
              <li className="hover:text-white cursor-pointer">Contact</li>

            </ul>
          </div>

          {/* Social */}
          <div>

            <h3 className="font-semibold mb-4">Follow Me</h3>

            <div className="flex space-x-4 text-xl">

              <a className="hover:text-indigo-400">
                <FaGithub />
              </a>

              <a className="hover:text-indigo-400">
                <FaLinkedin />
              </a>

              <a className="hover:text-indigo-400">
                <FaTwitter />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">

          © {new Date().getFullYear()} Chandra Shrestha. All rights reserved.

        </div>

      </div>

    </footer>
  );
}