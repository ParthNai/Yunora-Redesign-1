import YunoraPopup from "@/components/YunoraPopup";

function MockWebsite() {
  return (
    <div className="mock-site">
      <header className="mock-header">
        <div className="mock-ticker">
          <span>✦ Summer Luxury Sale — Up to 40% Off</span>
          <span>🚚 Free Shipping on All Orders</span>
          <span>🎁 Extra 5% Off on Prepaid Orders</span>
          <span>🛡 10 Year Warranty on Premium Products</span>
        </div>
        <nav className="mock-nav">
          <div className="mock-logo">
            <span className="mock-logo-brand">YUNORA</span>
            <span className="mock-logo-sub">FURNISHING</span>
          </div>
          <div className="mock-nav-links">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Collections</a>
            <a href="#">New Arrivals</a>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
          </div>
        </nav>
      </header>

      <section className="mock-hero">
        <div className="mock-hero-content">
          <h1>Timeless.<br />Beautiful.<br />Yunora.</h1>
          <p>Premium furnishings that transform your home into a sanctuary of luxury and comfort.</p>
          <button className="mock-hero-btn">Explore Collection →</button>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <>
      <MockWebsite />
      <YunoraPopup />
    </>
  );
}
