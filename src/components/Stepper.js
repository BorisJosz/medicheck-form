import React from "react";

const Stepper = ({ currentStep, numberOfStep }) => {
  let lines = []
  for(let i = 0 ; i < numberOfStep ; i++) {
    lines.push(
      <li key={i} className={currentStep === (i+1) ? "active" : ""} ></li>
    )
  }

  return (
    <ul id="progressbar">
      {lines}
    </ul>
  )
}

export default Stepper;
