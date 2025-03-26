import React, { useEffect, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const PrevContent = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [food, setFood] = useState([]);
  const carouselRef = useRef(null);
  const cardWidth = 200; 

  useEffect(() => {
    fetch("http://localhost:3005/data")
      .then((resp) => resp.json())
      .then((json) => {
        setFood(json);
      });
  }, []);

  const Signout = () => {
    navigate("/");
  };

  const data = [
    {
      id: 1,
      name: "Pizza",
      image: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"
    },
    {
      id: 2,
      name: "Burger",
      image: "https://mrbrownbakery.com/image/images/rEyMLsj21Ooxk5mfhdeh7bSevaLGzUtczWXVDj4u.jpeg?p=full"
    },
    {
      id: 3,
      name: "Chinese",
      image: "https://ik.imagekit.io/awwybhhmo/satellite_images/chinese/gray/about_us/2.jpg?tr=w-3840"
    },
    {
      id: 4,
      name: "Biryani",
      image: "https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg"
    },
    {
      id: 5,
      name: "Dosa",
      image: "https://i.ytimg.com/vi/CCab5oh0ZOc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA730YKb2VkyJ2V4Q-R9cICWRXs9w"
    },
    {
      id: 6,
      name: "Samosa",
      image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/08/Best-Indian-Punjabi-Samosa-Recipe.jpg"
    },
    {
      id: 7,
      name: "Rolls",
      image: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg"
    },
    {
      id: 8,
      name: "Bread",
      image: "https://fullofplants.com/wp-content/uploads/2023/05/Homemade-Naan-Bread-Restaurant-Style-Vegan-thumb-1-500x500.jpg"
    },
    {
      id: 9,
      name: "Samosa",
      image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/08/Best-Indian-Punjabi-Samosa-Recipe.jpg"
    },
    {
      id: 10,
      name: "Rolls",
      image: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg"
    },
    {
      id: 11,
      name: "Bread",
      image: "https://fullofplants.com/wp-content/uploads/2023/05/Homemade-Naan-Bread-Restaurant-Style-Vegan-thumb-1-500x500.jpg"
    }
  ];

  return (
    <div>
      <div className="container">
        <div className="navbar-brand">
          <img className="float-start" src="https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png" alt="logo" height={"90px"} />
          <button className="btn btn-primary float-end mt-4" onClick={Signout}>Sign Out</button>
        </div>
        <br />
        <br />
        <br />
        <br />

        <div className="carousel-container" style={{ width: "100%", overflow: "hidden" }}>
      <div className="carousel-wrapper " style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => {
            PrevContent.current.scrollBy({
              left: -cardWidth,
              behavior: "smooth",
            });
          }}
        >
          Left
        </button>

        <div
          ref={PrevContent}
          className="carousel mx-3"
          style={{
            display: "flex",
            overflowX: "hidden",
            scrollBehavior: "smooth",
  
          }}
        >
          {data.map((x) => (
            <div
              key={x.id}
              className="card"
              style={{
                minWidth: `${cardWidth}px`,
                marginRight: "20px",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <img
                className="img-fluid w-100"
                src={x.image}
                alt={x.name}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            PrevContent.current.scrollBy({
              left: cardWidth,
              behavior: "smooth",
            });
          }}
        >
          Right
        </button>
      </div>
    </div>

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          className="mx-auto form-control mt-5"
          placeholder="Search here"
        />
        <h1 className="text-danger mt-3">Hungry! Grab your favourite food from our restaurant</h1>

        <Row lg={4}>
          {food
            .filter((x) => {
              if (search === "") {
                return true;
              } else {
                return x.title.toLowerCase().includes(search.toLowerCase());
              }
            })
            .map((x) => {
              return (
                <Col key={x.id}>
                  <div className="card mt-5" style={{ width: "18rem", marginLeft: "20px" }}>
                    <img className="card-img-top" src={x.images} alt={x.name} />
                    <div className="card-body">
                      <h5>Restaurant Name: {x.title}</h5>
                      <h5>Restaurant Ratings: {x.ratings}</h5>
                      <h5>Restaurant Area: {x.area}</h5>
                      <h5>Restaurant Timing: {x.timing}</h5>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
