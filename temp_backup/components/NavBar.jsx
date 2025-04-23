import { Link } from 'react-router-dom';

const NavBar = () => (
    <div className="nav-bar">
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sport">Sport</Link>
          </li>
          <li>
            <Link to="/rating">Rating</Link>
          </li>
          <li>
            <Link to="/current-weather">Current Weather</Link>
          </li>
        </ul>
      </nav>
    </div>
);

export default NavBar;