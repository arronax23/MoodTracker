import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const navbar = useRef();

  const scroll = (e) => {
    console.log(e.target)
  }
  
  const calendarClick = (e) => {
    activateNavItem(e);
    navigate('/');
  }

  const chartClick = (e) => {
    activateNavItem(e);
    navigate('/chart');
  }

  const histogramClick = (e) => {
    activateNavItem(e);
    navigate('/histogram');
  }

  const setsClick = (e) => {
     activateNavItem(e);
     activateNavItem(e);navigate('/sets');
  }  

  const statsClick = (e) => {
    activateNavItem(e);
    navigate('/stats');
  }    

  const activateNavItem = (e) => {
    if(!e.target.classList.contains('active')) {
      e.target.classList.add('active');

      const navItems = navbar.current.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        if(item !== e.target) {
          item.classList.remove('active');
        }
      })
    }
  }


  return (
    <div onScroll={e => scroll(e)} className="home">
      <nav className="navbar" ref={navbar}>
        <div onClick={(e) => calendarClick(e)} className="nav-item active calednar-btn">Kalendarz</div>
        <div onClick={(e) => chartClick(e)} className="nav-item chart">Wykres</div>
        <div onClick={(e) => histogramClick(e)} className="nav-item histogram">Histogram</div>
        <div onClick={(e) => setsClick(e)} className="nav-item sets">Zestawy leków</div>
        <div onClick={(e) => statsClick(e)} className="nav-item stats">Statystyki</div>
        <h1 className="nav-item header">Dziennik nastroju</h1>
      </nav>
      <Outlet   />
    </div>
  );
};
export default Home;
