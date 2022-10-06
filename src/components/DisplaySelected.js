import React from "react";
import SelectionDisplayImage from "../assets/selectionDisplay.gif";
const DisplaySelected = (props) => {
  return (
    <div className="displaySelect">
      {props.active.length > 0 ? (
        <div className="selectionDisplayTab">You have selected:</div>
      ) : (
        <div className="selectionDisplayTab"></div>
      )}
      {props.active.length > 0 ? (
        props.allRanks.map((rank) => {
          return props.DisplaySelectedRanks(
            rank.rankValue,
            rank.badge,
            rank.rating,
            rank.rankName
          );
        })
      ) : (
        <div className="selectionDisplayTab-empty">
        
          <img
            className="selectionTabImage"
            src={SelectionDisplayImage}
            alt="..."
          />
          
          <div>Add something to your selection</div>
        </div>
      )}
    </div>
  );
};

export default DisplaySelected;
