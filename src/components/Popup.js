import React from "react";
 
function Popup(props){
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;