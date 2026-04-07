import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const navbar = useRef();

  const scroll = (e) => {
    console.log(e.target)
  }
  
  const calendarClick = () => {
    navigate('/');
  }


  const chartClick = () => {
    navigate('/chart');
  }

  const histogramClick = () => {
    navigate('/histogram');
  }

  const setsClick = () => {
    navigate('/sets');
  }  

  return (
    <div onScroll={e => scroll(e)} className="home">
      <nav className="navbar" ref={navbar}>
        <div onClick={calendarClick} className="nav-item calednar-btn">Kalendarz</div>
        <div onClick={chartClick} className="nav-item chart">Wykres</div>
        <div onClick={histogramClick} className="nav-item histogram">Histogram</div>
        <div onClick={setsClick} className="nav-item sets">Zestawy leków</div>
        <h1 className="nav-item header">Dziennik nastroju</h1>
      </nav>
      <Outlet   />
    </div>
  );
};
export default Home;
