import React from "react";
import './Form.css';
import FormSlide from './FormSlide.js';

class Form extends React.Component {
  render() {
    return form
  }
}

export default Form;

// should I use const or let?
const form =
<div className="container">
  <div className="formBody">
    <FormSlide />
  </div>
  <div className="form-background">
    <div className="formText title"> Launch a Check </div>
    <div className="formText next"> Next </div>
    <div className="formText previous"> Previous </div>
  </div>
  <div className="image-container">
    <img alt="Website background" src={'http://res.cloudinary.com/borisj/image/upload/v1526232024/Medicheck/MedicheckFormBackground.png'} className="background-image"/>
  </div>
</div>
