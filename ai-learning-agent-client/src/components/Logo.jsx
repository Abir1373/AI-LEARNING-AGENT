import logo from "../assets/logo.jpg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="inline-block group">
      <div className="flex items-center gap-1">
        <img
          className="w-11 h-11 rounded-xl shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-300"
          src={logo}
          alt="AiLearner"
        />
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all duration-500">
          AiLearner
        </span>
      </div>
    </Link>
  );
};

export default Logo;
