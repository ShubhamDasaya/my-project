import React from "react";
import "./Home.css"
const Home = () => {
  return (
    <>
      <div className="container-fluid text-center w-auto">
        <img src="./HomeCarImge.jpg" className=" container-fluid g-0 text-center" alt="Car Image" />
        <h2 className="mt-3">Welcome to Car Swift</h2>
      </div>
      <div>
            <div className="container mt-4">
              <div className="card shadow-lg p-3">
                <img src="card-img-top img-fluid rounden" alt="" />
              </div>
              <div className="card-body text-center">
                <h1 className="card-title"> titel : {}</h1>
                <p className="card-text"> </p>
                <button className="btn btn-primary w-100"></button>
              </div>t
            </div>
            </div>
    </>
  );
};

export default Home;
