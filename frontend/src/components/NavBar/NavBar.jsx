import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <Link>
          <p>Home</p>
        </Link>
        <Link>
          <p>Own Profile</p>
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
