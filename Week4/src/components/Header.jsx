import "./Header.css";

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src="/src/assets/img/Lab03/Group 21.png" alt="logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="nav-links">
          <a href="#" className="nav-item">
            What to cook
          </a>
          <a href="#" className="nav-item">
            Recipes
          </a>
          <a href="#" className="nav-item">
            Ingredients
          </a>
          <a href="#" className="nav-item">
            Occasions
          </a>
          <a href="#" className="nav-item">
            About Us
          </a>
        </div>
        <div className="actions">
          <button className="recipe-box"> Your Recipe Box</button>
          <img
            src="/src/assets/img/Lab03/Avatar 42.png"
            alt="User Avatar"
            className="avatar"
          />
        </div>
      </nav>
    </header>
  );
}
