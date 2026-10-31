import logo from "@/assets/images/logo.png";

export default function HomePage() {
  return (
    <main>
      <div className="main-title">
        <img src={logo} alt="" />
        <p className="main-subtitle">Catalogue</p>
      </div>
    </main>
  );
}
