import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-primary-content w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                AI
              </div>
              <h2 className="text-xl font-bold">AI Learner</h2>
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              Empowering students with AI-powered quizzes and smart learning
              tools. Learn smarter, not harder.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="footer-title mb-4 opacity-80">Quick Links</h6>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/"
                className="link link-hover text-sm opacity-80 hover:opacity-100"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="link link-hover text-sm opacity-80 hover:opacity-100"
              >
                Contact
              </Link>
              <Link
                to="/dashboard"
                className="link link-hover text-sm opacity-80 hover:opacity-100"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h6 className="footer-title mb-4 opacity-80">Support</h6>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="link link-hover text-sm opacity-80 hover:opacity-100"
              >
                Help Center
              </Link>
              <a className="link link-hover text-sm opacity-80 hover:opacity-100">
                Privacy Policy
              </a>
              <a className="link link-hover text-sm opacity-80 hover:opacity-100">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h6 className="footer-title mb-4 opacity-80">Connect</h6>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-colors"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-colors"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-colors"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="mailto:support@ailearner.com"
                className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content transition-colors"
              >
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm opacity-50">
          © {new Date().getFullYear()} AI Learner. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
