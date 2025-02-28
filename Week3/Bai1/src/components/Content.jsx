import "./Content.css";
const Content = () => {
  return (
    <div className="container">
      <aside>
        <div className="filter">
          <div className="filter-title">
            <img src="src/assets/icon_menu.png" alt="icon" />
            <h3>FILTERS</h3>
          </div>

          <h4>Type</h4>
          <div className="filter-type">
            <label>
              <input type="checkbox" name="" id="" />
              Pan-fried
            </label>
            <label>
              <input type="checkbox" name="" id="" /> Stir-fried
            </label>
            <label>
              <input type="checkbox" name="" id="" checked /> Grilled
            </label>
            <label>
              <input type="checkbox" name="" id="" checked /> Roasted
            </label>
            <label>
              <input type="checkbox" name="" id="" /> Sauteed
            </label>
            <label>
              <input type="checkbox" name="" id="" /> Baked
            </label>
            <label>
              <input type="checkbox" name="" id="" /> Steamed
            </label>
            <label>
              <input type="checkbox" name="" id="" /> Stewed
            </label>
          </div>
        </div>

        <div>
          <img src="src/assets/filter.png" alt="" className="img-filter" />
        </div>

        <button className="btn-apply">Apply</button>
      </aside>
      <section>
        <h2>Sorry, no results were found for “cakescascsa”</h2>
        <img src="src/assets/find.png" alt="" />
        <p>We have all your Independence Day sweets covered.</p>
        <div className="tags">
          <span className="tag pink">Sweet Cake</span>
          <span className="tag purple">Black Cake</span>
          <span className="tag red">Pozole Verde</span>
          <span className="tag green">Healthy food</span>
        </div>
      </section>
    </div>
  );
};

export default Content;
