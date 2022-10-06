import React from "react";
import RankingIcon from "../assets/rankingDisplay.gif";

const DisplayRanksResult = (props) => {
  return (
    <div className="displayFinal">
      {props.checkEmpty() === false ? (
        props.allRanks.map((rank) => {
          return props.DisplayFinalRanks(
            rank.rankValue,
            rank.badge,
            rank.rating,
            rank.rankName
          );
        })
      ) : (
        <div className="ranking-empty">
          <div className="ranking-empty-image">
            <img className="ranking-empty-icon" src={RankingIcon} alt="..." />
          </div>
          <div className="ranking-empty-message">
            Your Top 3 Cars will be displayed here
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayRanksResult;
