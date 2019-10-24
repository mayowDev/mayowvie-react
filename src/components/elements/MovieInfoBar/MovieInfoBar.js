import React from "react";
import { calcTime, convertMoney } from "../../../helpers";
import FontAwesome from "react-fontawesome";
import "./MovieInfoBar.css";
const MovieInfoBar = props => {
  return (
    <div className='rmdb-movieinfobar'>
      <div className='rmdb-movieinfobar-content'>
        {/* watch-time icon */}
        <div className='rmdb-movieinfobar-content-col'>
          <FontAwesome className='fa-time' name='clock-o' size='2x' />
          <span className='rmdb-movieinfobar-info'>
            Watch time: {calcTime(props.time)}
          </span>
        </div>

        {/* budget icon */}
        <div className='rmdb-movieinfobar-content-col'>
          <FontAwesome className='fa-budget' name='money' size='2x' />
          <span className='rmdb-movieinfobar-info'>
            Budget : {convertMoney(props.budget)}
          </span>
        </div>

        {/* Revenue-Ticket icon */}
        <div className='rmdb-movieinfobar-content-col'>
          <FontAwesome className='fa-revenue' name='ticket' size='2x' />
          <span className='rmdb-movieinfobar-info'>
            Revenue : {convertMoney(props.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBar;
