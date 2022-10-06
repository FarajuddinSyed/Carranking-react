import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Ranking.css";
import DisplayRanksResult from "./DisplayRanksResult";
import FirstIcon from "../assets/first-icon.png";
import SecondIcon from "../assets/second-icon.png";
import ThirdIcon from "../assets/third-icon.png";
import Loadingcarranking from "../assets/carranking_Loading.gif";
import LoggedUserIcon from "../assets/loggedUserIcon.png";
import Footer from "./Footer";
const Ranking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const loggedUser = localStorage.getItem("username");
  const finalRank1 = JSON.parse(localStorage.getItem("Rank 1 Final"));
  const finalRank2 = JSON.parse(localStorage.getItem("Rank 2 Final"));
  const finalRank3 = JSON.parse(localStorage.getItem("Rank 3 Final"));
  const locationExists = () => {
    localStorage.removeItem("rank1");
    localStorage.removeItem("rank2");
    localStorage.removeItem("rank3");
    localStorage.removeItem("myRankings");
    if (location.state === null) {
      return false;
    } else {
      return true;
    }
  };

  const [rank1, setRank1] = useState(
    locationExists() === true
      ? location.state.rank1
      : finalRank1 !== null
      ? finalRank1
      : []
  );
  const [rank2, setRank2] = useState(
    locationExists() === true
      ? location.state.rank2
      : finalRank2 !== null
      ? finalRank2
      : []
  );
  const [rank3, setRank3] = useState(
    locationExists() === true
      ? location.state.rank3
      : finalRank3 !== null
      ? finalRank3
      : []
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allRanks = [
    { rankValue: rank1, badge: FirstIcon, rating: 10, rankName: "Rank 1" },
    { rankValue: rank2, badge: SecondIcon, rating: 9, rankName: "Rank 2" },
    { rankValue: rank3, badge: ThirdIcon, rating: 8, rankName: "Rank 3" },
  ];
  const [swap1, setSwap1] = useState("");
  const [swap2, setSwap2] = useState("");

  const swapFunction = () => {
    let temp = "";
    if (swap1 === "Rank 1") {
      temp = rank1;
      if (swap2 === "Rank 2") {
        setRank1(rank2);
        setRank2(temp);
      } else if (swap2 === "Rank 3") {
        setRank1(rank3);
        setRank3(temp);
      }
    } else if (swap1 === "Rank 2") {
      temp = rank2;
      if (swap2 === "Rank 1") {
        setRank2(rank1);
        setRank1(temp);
      } else if (swap2 === "Rank 3") {
        setRank2(rank3);
        setRank3(temp);
      }
    } else if (swap1 === "Rank 3") {
      temp = rank3;
      if (swap2 === "Rank 1") {
        setRank3(rank1);
        setRank1(temp);
      } else if (swap2 === "Rank 2") {
        setRank3(rank2);
        setRank2(temp);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("FinalRankings", JSON.stringify(allRanks));
    localStorage.setItem("Rank 1 Final", JSON.stringify(rank1));
    localStorage.setItem("Rank 2 Final", JSON.stringify(rank2));
    localStorage.setItem("Rank 3 Final", JSON.stringify(rank3));
    window.history.replaceState({}, document.title);
  }, [allRanks, rank1, rank2, rank3]);

  useEffect(() => {}, []);

  const checkEmpty = () => {
    if (rank1.length === 0 && rank2.length === 0 && rank3.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const resetRankings = () => {
    setRank1([]);
    setRank2([]);
    setRank3([]);
  };

  const logoutFunc = () => {
    localStorage.clear();
    navigate("/");
  };

  const DisplayFinalRanks = (mySelect, badge, rating, rankName) => {
    return mySelect.map((a) => {
      return (
        <>
          <div className="car-card-result">
            <div class="final-card" id={a.id}>
              <div class="final-details">
                <div class="final-header">
                  <img class="final-image" src={a.image} alt="..." />
                  <div className="final-card-heading">{a.carName}</div>
                  <div className="final-card-rankName">{rankName}</div>
                  <span class="final-rating">Rating: {rating}</span>
                </div>
                <div class="final-description">
                  <p class="text">{a.description}</p>
                </div>
              </div>
              <div
                class="blurred-background"
                style={{ backgroundImage: `url(${badge})` }}
              ></div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <div>
      {loading ? (
        <div className="loadingScreen">
          <img className="loadingIcon" src={Loadingcarranking} alt="Loading" />
        </div>
      ) : (
        <>
          <div className="ranking-header">
            <Header
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
                  <Link to="/">
                    <button className="login-button btn-head" onclick={logoutFunc}>Login</button>
                  </Link>
                )
              }
            />
          </div>

          <div className="ranking-body">
            <div className="displayRanking">
              {checkEmpty() === false ? (
                <>
                  <div className="text-result">Car Rankings</div>
                  <div className="swap-elements">
                    <div class="select">
                      <select
                        class="select-text"
                        onChange={(e) => {
                          setSwap1(e.target.value);
                        }}
                        required
                      >
                        <option value="" disabled selected></option>
                        <option value="Rank 1">Rank 1</option>
                        <option value="Rank 2">Rank 2</option>
                        <option value="Rank 3">Rank 3</option>
                      </select>
                      <span class="select-highlight"></span>

                      <label class="select-label">Swap 1</label>
                    </div>
                    <div class="select">
                      <select
                        class="select-text"
                        onChange={(e) => {
                          setSwap2(e.target.value);
                        }}
                        required
                      >
                        <option value="" disabled selected></option>
                        <option value="Rank 1">Rank 1</option>
                        <option value="Rank 2">Rank 2</option>
                        <option value="Rank 3">Rank 3</option>
                      </select>
                      <span class="select-highlight"></span>

                      <label class="select-label">Swap 2</label>
                    </div>
                    <div className="swap-button">
                      <button
                        className="login-button swap-btn"
                        onClick={swapFunction}
                      >
                        Swap
                      </button>
                      <button
                        className="login-button clear-btn"
                        onClick={resetRankings}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-result"></div>
              )}
              <DisplayRanksResult
                checkEmpty={checkEmpty}
                allRanks={allRanks}
                DisplayFinalRanks={DisplayFinalRanks}
              />
            </div>
          </div>
          <div className="ranking-footer">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Ranking;
