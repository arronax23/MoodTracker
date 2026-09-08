import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const navbar = useRef<HTMLElement | null>(null);

  const calendarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    activateNavItem(e);
    navigate("/");
  };

  const chartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    activateNavItem(e);
    navigate("/chart");
  };

  const histogramClick = (e: React.MouseEvent<HTMLDivElement>) => {
    activateNavItem(e);
    navigate("/histogram");
  };

  const setsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    activateNavItem(e);
    activateNavItem(e);
    navigate("/sets");
  };

  const statsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    activateNavItem(e);
    navigate("/stats");
  };

  const activateNavItem = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.add("active");

      const navItems = navbar.current?.querySelectorAll(".nav-item");
      navItems?.forEach((item) => {
        if (item !== e.target) {
          item.classList.remove("active");
        }
      });
    }
  };

  return (
    <div className="home">
      <nav className="navbar" ref={navbar}>
        <div onClick={calendarClick} className="nav-item active calednar-btn">
          Kalendarz
        </div>
        <div onClick={chartClick} className="nav-item chart">
          Wykres
        </div>
        <div onClick={histogramClick} className="nav-item histogram">
          Histogram
        </div>
        <div onClick={setsClick} className="nav-item sets">
          Zestawy leków
        </div>
        <div onClick={statsClick} className="nav-item stats">
          Statystyki
        </div>
        <h1 className="nav-item header">Dziennik nastroju</h1>
      </nav>
      <Outlet />
    </div>
  );
};
export default Home;
