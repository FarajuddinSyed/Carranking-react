import React from "react";
import "./CarCards.css";
import FirstIcon from "../assets/first-icon.png";
import SecondIcon from "../assets/second-icon.png";
import ThirdIcon from "../assets/third-icon.png";
const CarCards = (props) => {
  return (
    <div className="car-card" id={props.car.id}>
      <div className="car-image-holder">
        <img
          className="car-image"
          src={props.car.image}
          alt={props.car.carName}
        />
      </div>
      <div className="car-text">
        <div className="heading-car">{props.car.carName}</div>
        <div className="desc-car">{props.car.description}</div>
      </div>
      <div className="addToRank">
        {props.rank1.length > 0 &&
        props.rank1.some(
          (filtered) => filtered.carName === props.car.carName
        ) ? (
          <button
            className="addrank-button rank1"
            value={props.car.carName}
            onClick={props.handleChange}
          >
            <img className="miniIcon" src={FirstIcon} alt="icon" /> Rank 1
          </button>
        ) : props.rank2.length > 0 &&
          props.rank2.some(
            (filtered) => filtered.carName === props.car.carName
          ) ? (
          <button
            className="addrank-button rank2"
            value={props.car.carName}
            onClick={props.handleChange}
          >
            <img className="miniIcon" src={SecondIcon} alt="icon" /> Rank 2
          </button>
        ) : props.rank3.length > 0 &&
          props.rank3.some(
            (filtered) => filtered.carName === props.car.carName
          ) ? (
          <button
            className="addrank-button rank3"
            value={props.car.carName}
            onClick={props.handleChange}
          >
            <img className="miniIcon" src={ThirdIcon} alt="icon" /> Rank 3
          </button>
        ) : (
          <button
            className="addrank-button"
            value={props.car.carName}
            onClick={props.loggedUser ? props.handleChange : props.loginPlease}
          >
            ADD RANK
          </button>
        )}
      </div>
    </div>
  );
};

export default CarCards;
