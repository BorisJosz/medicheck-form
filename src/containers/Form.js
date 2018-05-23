import React from "react";
import './Form.css';
import './Label.css';
import Stepper from '../components/Stepper.js';
import '../components/Toggle.css';

// added stuff
import axios from 'axios';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 1,
      numberOfStep: 5,
      animationSide: "slideLeft",
      contactPersonName: "",
      contactEmail: "",
      employeeFirstName: "",
      employeeLastName: "",
      employeePhoneNumber: "",
      employeeAddress: "",
      commentDoctor: "",
      commentMedicheck: "",
      startDate: undefined,
      endDate: undefined,
      employeeLanguage: false,
      optimizedCheck: false,
      atHome: false,
    };
  }

  toggleCssLanguage = () => {
    let elementFr = document.getElementById("fr");
    elementFr.classList.toggle("toggleActive");
    let elementNl = document.getElementById("nl");
    elementNl.classList.toggle("toggleActive");
  }

  toggleCssOptimized = () => {
    let elementOp = document.getElementById("optimized");
    elementOp.classList.toggle("toggleActive");
    let elementIm = document.getElementById("immediate");
    elementIm.classList.toggle("toggleActive");
  }

  toggleCssHome = () => {
    let elementDo = document.getElementById("doctorsOffice");
    elementDo.classList.toggle("toggleActive");
    let elementAh = document.getElementById("atHome");
    elementAh.classList.toggle("toggleActive");
  }

  handleCheck = event => {
    const target = event.target;
    const name = target.name
    const value = target.value
    this.setState({
      [name]: !value
    });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  prevStep = () => {
    this.setState({currentStep: this.state.currentStep - 1});
    this.setState({animationSide: "slideRight"})
  }

  // I want my prevStep method to also change the class of my fieldset to slideRight

  nextStep = () => {
    this.setState({currentStep: this.state.currentStep + 1});
    this.setState({animationSide: "slideLeft"})
  }

  // POST REQUEST
  submitStep = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/',
      data: {
        contactPersonName: this.state.contactPersonName,
        contactEmail: this.state.contactEmail,
        employeeFirstName: this.state.employeeFirstName,
        employeeLastName: this.state.employeeLastName,
        employeePhoneNumber: this.state.employeePhoneNumber,
        employeeAddress: this.state.employeeAddress,
        employeeLanguage: this.state.employeeLanguage,
        optimizedCheck: this.state.optimizedCheck,
        atHome: this.state.atHome,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        commentDoctor: this.state.commentDoctor,
        commentMedicheck: this.state.commentMedicheck,
      },
      config: { headers: {'Content-Type': 'application/json' }}
    })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  render() {
    const { currentStep } = this.state

    return (
      <div className="container">
        <div className="formBody">
          <div className="form-background">
            <div className="formText title"> Launch a Check </div>

            <form id="msform">
              {currentStep === 1 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Company Information </h2>
                    
                    <div id="contactPersonName" className="form-group">
                      <input className="form-control" name="contactPersonName" type="text" required value={this.state.contactPersonName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactPersonName">Contact Person's name</label>
                    </div>
                    
                    <input id="contactEmail" name="contactEmail" type="text" value={this.state.contactEmail} onChange={this.handleInputChange} placeholder="Email address" />
                  </div>
                </fieldset>
              }
              {currentStep === 2 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Employee Information </h2>
                    <input id="employeeFirstName" name="employeeFirstName" type="text" value={this.state.employeeFirstName} onChange={this.handleInputChange} placeholder="First Name" />
                    <input id="employeeLastName" name="employeeLastName" type="text" value={this.state.employeeLastName} onChange={this.handleInputChange} placeholder="Last Name" />
                    <input id="employeePhoneNumber" name="employeePhoneNumber" type="text" value={this.state.employeePhoneNumber} onChange={this.handleInputChange} placeholder="Phone number" />
                    <input id="employeeAddress" name="employeeAddress" type="text" value={this.state.employeeAddress} onChange={this.handleInputChange} placeholder="Street Address" />
                    <div className="languageQuestion"> The employee speaks </div>

                    {/* Toggle options */}
                    <div id="fr" className="languageQuestion fr toggleActive"> FR </div>
                    <div id="nl" className="languageQuestion nl"> NL </div>

                    {/* TOGGLE */}
                    <div className="toggleLanguage">
                      <label className="switch">
                        <input onClick={this.toggleCssLanguage} name="employeeLanguage" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.employeeLanguage} value={this.state.employeeLanguage} />
                        <div className="slider"></div>
                      </label>
                    </div>
                    
                  </div>
                </fieldset>
              }
              {currentStep === 3 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Check Details </h2>

                    {/* Toggle Options */}
                      <div id="optimized" className="toggleTitles optimizedCheck toggleActive" title="Allows for the check to take place at the most opportune time of the incapacity period to maximize the chances of an early return to work"> Optimized Check </div>
                      {/* <div className="toggleDetailsText optimized"> Allows for the check to take place at the most opportune time of the incapacity period to maximize the chances of an early return to work </div> */}
                      <div id="immediate" className="toggleTitles immediateCheck" title="Allows for the check to happen in the shortest delays possible"> Immediate Check </div>
                      {/* <div className="toggleDetailsText immediate"> Allows for the check to happen in the shortest delays possible </div> */}

                    <div className="toggle-1">
                      <label className="switch">
                        <input onClick={this.toggleCssOptimized} name="optimizedCheck" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.optimizedCheck} value={this.state.optimizedCheck} />
                        <div className="slider"></div>
                      </label>
                    </div>

                    <div id="doctorsOffice" className="toggleTitles doctorsOffice toggleActive" title="We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordance with the positive approach that your employer has chosen to partake in"> At the doctor's cabinet </div>
                    {/* <div className="toggleDetailsText doctor"> We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordacne with the positive approach that your employer has chosen to partake in </div> */}
                    <div id="atHome" className="toggleTitles atHome" title="Checks at home are recommended only in cases where the employee is required to stay home"> At the employee's home </div>
                    {/* <div className="toggleDetailsText home"> Checks at home are recommended only in cases where the employee is required to stay home </div> */}
                    
                    <div className="toggle-2">
                      <label className="switch">
                        <input onClick={this.toggleCssHome} name="atHome" type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.atHome} value={this.state.atHome} />
                        <div className="slider"></div>
                      </label>
                    </div>
                    
                  </div>
                </fieldset>
              }
              {currentStep === 4 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Incapacity Period </h2>
                    <div className="calendar">
                      <DateRangePicker 
                        startDateId="startDate"
                        endDateId="endDate"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={(focusedInput) => { 
                          if (!focusedInput) return;
                          this.setState({ focusedInput })}}
                       
                      />
                    </div>
                    <div className="certificateImageUploader" >

                    </div>
                  </div>
                </fieldset>
              }
              {currentStep === 5 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Comments </h2>
                    <textarea id="commentDoctor" name="commentDoctor" value={this.state.commentDoctor} onChange={this.handleInputChange} placeholder="Leave your comment for the doctor..." />
                    <textarea id="commentMedicheck" name="commentMedicheck" value={this.state.commentMedicheck} onChange={this.handleInputChange} placeholder="Leave your comment for us at Medicheck..." />
                    </div>
                </fieldset>
              }
            </form>

            {/* BUTTONS */}

            {currentStep === 1 &&
              <div className="button-placement">
                <button className="next action-button" onClick={this.nextStep}> Next </button>
              </div>
            }
            {currentStep >= 2 && currentStep <= 4 &&
              <div className="button-placement">
                <button className="prev action-button" onClick={this.prevStep}> Previous </button>
                <button className="next action-button" onClick={this.nextStep}> Next </button>
              </div>
            }
            {currentStep === 5 &&
              <div className="button-placement">
                <button className="prev action-button" onClick={this.prevStep}> Previous </button>
                <button className="submit action-button" onClick={this.submitStep}> Submit </button>
              </div>
            }

            {/* progressbar */}
            <Stepper currentStep={currentStep} numberOfStep={this.state.numberOfStep}/>

            </div>
          </div>
        <div className="image-container">
          <img alt="Website background" src={'http://res.cloudinary.com/borisj/image/upload/v1526232024/Medicheck/MedicheckFormBackground.png'} className="background-image"/>
        </div>
      </div>
    )
  }
}

export default Form;
