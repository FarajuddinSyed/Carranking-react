import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CarCards from "./CarCards";
import DisplaySelected from "./DisplaySelected";
import axios from "axios";
import FirstIcon from "../assets/first-icon.png";
import SecondIcon from "../assets/second-icon.png";
import ThirdIcon from "../assets/third-icon.png";
import GrayIcon from "../assets/gray-star.png";
import StarAdded from "../assets/star-addedcrop.gif";
import Loadingcarranking from "../assets/carranking_Loading.gif";
import NotFound from "../assets/displayNotFound.gif";
import LoggedUserIcon from "../assets/loggedUserIcon.png";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [carItems, setCarItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(true);
  const [value, setValue] = useState("");
  const loggedUser = localStorage.getItem("username");
  const ranked1 = JSON.parse(localStorage.getItem("Rank 1"));
  const ranked2 = JSON.parse(localStorage.getItem("Rank 2"));
  const ranked3 = JSON.parse(localStorage.getItem("Rank 3"));
  const currentActive = JSON.parse(localStorage.getItem("active"));
  const [searchParams] = useState(["carName", "description"]);
  const [query, setQuery] = useState("");
  const [rank1, setRank1] = useState(ranked1 !== null ? ranked1 : []);
  const [rank2, setRank2] = useState(ranked2 !== null ? ranked2 : []);
  const [rank3, setRank3] = useState(ranked3 !== null ? ranked3 : []);
  const [active, setActive] = useState(
    currentActive !== null ? currentActive : []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allRanks = [
    { rankValue: rank1, badge: FirstIcon, rating: 10, rankName: "Rank 1" },
    { rankValue: rank2, badge: SecondIcon, rating: 9, rankName: "Rank 2" },
    { rankValue: rank3, badge: ThirdIcon, rating: 8, rankName: "Rank 3" },
  ];
  const rankingSubmit = {
    rank1: rank1,
    rank2: rank2,
    rank3: rank3,
  };

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      let url =
        "https://raw.githubusercontent.com/SyedFarajuddin/Carrankings-react/main/src/luxuryvehicles.json";
      let response = await axios.get(url);
      setLoading(false);
      let myData = await response.data;
      setCarItems(myData);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setShowSnackbar(true);
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("myRankings", JSON.stringify(allRanks));
    localStorage.setItem("Rank 1", JSON.stringify(rank1));
    localStorage.setItem("Rank 2", JSON.stringify(rank2));
    localStorage.setItem("Rank 3", JSON.stringify(rank3));
    localStorage.setItem("active", JSON.stringify(active));
  }, [allRanks, rank1, rank2, rank3, active, rankingSubmit]);

  if (showSnackbar === true) {
    setTimeout(() => {
      setShowSnackbar("false");
      setErrorMessage("");
    }, 3000);
  }
  const carDisplay = (cars) => {
    return cars.map((data, index) => {
      const handleChange = (e) => {
        setValue(e.target.value);

        if (!active.includes(e.target.value)) {
          active.push(e.target.value);
        } else {
          setActive(active.filter((num) => num !== e.target.value));
        }

        if (active.length > 3) {
          active.length = 3;
          setShowSnackbar(true);
          setErrorMessage("You can only select 3 items at a time!");
        }

        if (rank1.length === 0) {
          if (!rank2.includes(data) && !rank3.includes(data)) {
            setRank1([data]);
          }
        } else if (rank2.length === 0) {
          if (!rank1.includes(data) && !rank3.includes(data)) {
            setRank2([data]);
          }
        } else if (rank3.length === 0) {
          if (!rank1.includes(data) && !rank2.includes(data)) {
            setRank3([data]);
          }
        }

        if (rank1.length > 0 && rank1.includes(data)) {
          setRank1([]);
        } else if (rank2.length > 0 && rank2.includes(data)) {
          setRank2([]);
        } else if (rank3.length > 0 && rank3.includes(data)) {
          setRank3([]);
        }
      };

      const loginPlease = () => {
        setShowSnackbar(true);
        setErrorMessage("You must be logged in to Add Rank");
      };

      return (
        <CarCards
          car={data}
          index={index}
          handleChange={handleChange}
          rank1={rank1}
          rank2={rank2}
          rank3={rank3}
          value={value}
          active={active}
          loggedUser={loggedUser}
          loginPlease={loginPlease}
        />
      );
    });
  };
  const removeRanks = () => {
    localStorage.removeItem("myRankings");
    localStorage.removeItem("Rank 1");
    localStorage.removeItem("Rank 2");
    localStorage.removeItem("Rank 3");
    localStorage.removeItem("active");
  };
  const logoutFunc = () => {
    localStorage.clear();
    navigate("/");
  };
  const rankingLogin = () => {
    setShowSnackbar(true);
    setErrorMessage("You must be logged in to view your car ranking");
  };

  const DisplaySelectedRanks = (mySelect, badge, rating, rankName) => {
    const removeRank = () => {
      mySelect.map((s) => {
        return setActive(active.filter((num) => num !== s.carName));
      });

      if (rank1.length > 0 && rank1.includes(...mySelect)) {
        setRank1([]);
      } else if (rank2.length > 0 && rank2.includes(...mySelect)) {
        setRank2([]);
      } else if (rank3.length > 0 && rank3.includes(...mySelect)) {
        setRank3([]);
      }
    };
    return mySelect.map((a) => {
      return (
        <div className="car-card-selected">
          <div className="carcard-image-holder">
            <img
              className="car-image-selected"
              src={a.image}
              alt={a.carName}
            />
          </div>

          <div className="car-selected">
            <div className="selected-heading-car">{a.carName}</div>
            <div className="selected-rating">Rating: {rating}</div>
            <span className="removedbtn" onClick={removeRank} name={a.carName}>
              {" "}
              Remove
            </span>
          </div>
          <div className="badge-selected">
            <img className="badgeDisplay" src={badge} alt={"rankIcon"} />
            <div className="rankDisplay">{rankName}</div>
          </div>
        </div>
      );
    });
  };

  const search = (data) => {
    return data.filter((item) => {
      return searchParams.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });
    });
  };

  const AllItems = () => {
    return (
      <div className="displayMenu centered">
        {" "}
        {search(carItems).length > 0 ? (
          carDisplay(search(carItems))
        ) : (
          <div className="displayNoCar">
            <img className="displayNotFound" src={NotFound} alt="..." />
            <div className="Nocar-text">No Car brands found</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="home-doc">
      {loading ? (
        <div className="loadingScreen">
          <img className="loadingIcon" src={Loadingcarranking} alt="Loading" />
        </div>
      ) : (
        <>
          <div className="homeHead">
            <Header
              search={
                <input
                  type="text"
                  className="search-car"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              }
              userDisplay={
                loggedUser ? (
                  <span className="user-dot">
                    <img
                      className="user-image"
                      src={LoggedUserIcon}
                      alt={loggedUser}
                    />
                    <div className="dropdown-user">
                      <div className="logged-message">
                        {" "}
                        Hello, {loggedUser}{" "}
                      </div>

                      <span className="logout" onClick={logoutFunc}>
                        Logout
                      </span>
                    </div>
                  </span>
                ) : (
                  <button
                    className="login-button btn-head"
                    onClick={() => {
                      localStorage.clear()
                      navigate("/");
                    }}
                  >
                    Login
                  </button>
                )
              }
              rankList={
                active.length === 3 ? (
                  <Link to="/ranking" state={rankingSubmit}>
                    <span className="starAdded">
                      <img
                        className="rankStar"
                        src={StarAdded}
                        alt="viewRanks"
                        onClick={removeRanks}
                      />
                    </span>
                  </Link>
                ) : loggedUser ? (
                  <Link to="/ranking">
                    <span className="starAdded">
                      <img
                        className="rankStar"
                        src={GrayIcon}
                        alt="viewRanks"
                        onClick={removeRanks}
                      />
                    </span>
                  </Link>
                ) : (
                  <span className="starAdded" onClick={rankingLogin}>
                    <img className="rankStar" src={GrayIcon} alt="viewRanks" />
                  </span>
                )
              }
            />
          </div>

          <div>
            <div className="homeBody">
              <div className="menuDisplay holderBox">
                <div className="tab">
                  <span
                    className={
                      selectedTab === false
                        ? "car-tab"
                        : "car-tab car-tab-active"
                    }
                    onClick={() => {
                      setSelectedTab(true);
                    }}
                  >
                    Car Brands
                  </span>
                  <span
                    className={
                      selectedTab === true
                        ? "car-tab tab2"
                        : "car-tab tab2 car-tab-active"
                    }
                    onClick={() => {
                      setSelectedTab(false);
                    }}
                  >
                    Selected
                  </span>
                </div>
                <div className="displayMenu centered display-mobile">
                  {selectedTab === true ? (
                    AllItems()
                  ) : (
                    <div className="displayMobile">
                      {" "}
                      <DisplaySelected
                        active={active}
                        allRanks={allRanks}
                        DisplaySelectedRanks={DisplaySelectedRanks}
                      />
                    </div>
                  )}
                </div>

                <div className="displayMenu centered pc-display">
                  {" "}
                  {AllItems()}
                </div>

                {active.length === 3 ? (
                  <Link to="/ranking" state={rankingSubmit}>
                    <p className="showpoll-ribbon ribbon-mobile">
                      <span className="showpoll-text ribbon-mobile-text"  onClick={removeRanks}>
                        {" "}
                        View Results
                      </span>
                    </p>
                  </Link>
                ) : (
                  <div></div>
                )}
                {showSnackbar === true ? (
                  <div className="snackbar">{errorMessage}</div>
                ) : (
                  <div className=""></div>
                )}
              </div>
              <div className="displaySelectedRanks holderBox">
                <DisplaySelected
                  active={active}
                  allRanks={allRanks}
                  DisplaySelectedRanks={DisplaySelectedRanks}
                />
                {active.length === 3 ? (
                  <Link to="/ranking" state={rankingSubmit}>
                    <p className="showpoll-ribbon">
                      <span className="showpoll-text"  onClick={removeRanks}> View Results</span>
                    </p>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="home-footer">
              <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
