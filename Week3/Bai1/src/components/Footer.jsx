import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Welcome to our website, a wonderful place to explore and learn how
            to cook like a pro.
          </p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Send</button>
          </div>
        </div>

        <div className="footer-section">
          <h3>Learn More</h3>
          <ul>
            <li>
              <a href="#">Our Cooks</a>
            </li>
            <li>
              <a href="#">See Our Features</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li>
              <a href="#">Gift Subscription</a>
            </li>
            <li>
              <a href="#">Send Us Feedback</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Recipes</h3>
          <ul>
            <li>
              <a href="#">What to Cook This Week</a>
            </li>
            <li>
              <a href="#">Pasta</a>
            </li>
            <li>
              <a href="#">Dinner</a>
            </li>
            <li>
              <a href="#">Healthy</a>
            </li>
            <li>
              <a href="#">Vegetarian</a>
            </li>
            <li>
              <a href="#">Vegan</a>
            </li>
            <li>
              <a href="#">Christmas</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
          <span>Chefify</span>
        </div>
        <p>
          © 2023 Chefify Company | <a href="#">Terms of Service</a> |{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer