import React from "react";
function Alarm({ title }) {
  return (
    <div>
      <span>
        <span className="alarm-icon"></span>
        <p>{title}</p>
      </span>
    </div>
  );
}
export default Alarm;
