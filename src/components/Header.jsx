import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import mobLogo from "../assets/mob-logo.png";

const Header = ({ showForm, setShowForm }) => {
  return (
    <header className="absolute w-full z-50">
      <div className="mx-auto max-w-[1440px] w-full xl:px-8">
        <div className="flex items-center justify-between py-5 px-4 sm:px-6 lg:px-8 xl:px-0">
          <Link to="/">
            <img
              src={logo}
              alt="today-i-learned"
              className="sm:h-14 h-10 hidden sm:block"
            />
            <img
              src={mobLogo}
              alt="today-i-learned"
              className="sm:h-12 h-10 block sm:hidden"
            />
          </Link>

          <button
            onClick={() => setShowForm((show) => !show)}
            className="btn-gradient font-coiny !leading-none uppercase text-lg sm:px-8 sm:pt-5 sm:pb-[17px] px-3 pt-2 pb-3 rounded-full transition-all duration-300 sm:hover:scale-110 hover:-rotate-2 hover:scale-105"
          >
            {showForm ? "Close" : "Share a fact"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
