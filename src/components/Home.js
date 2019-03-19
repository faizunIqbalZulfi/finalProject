import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div className="bd-example">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleCaptions" data-slide-to="1" />
            <li data-target="#carouselExampleCaptions" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={require("../images/photography6.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>First slide label</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  distinctio quisquam magnam consequuntur officiis ex quod
                  quidem doloribus aperiam sint.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("../images/photography4.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Second slide label</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  distinctio quisquam magnam consequuntur officiis ex quod
                  quidem doloribus aperiam sint.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("../images/photography5.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h1>Third slide label</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  distinctio quisquam magnam consequuntur officiis ex quod
                  quidem doloribus aperiam sint.
                </p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
