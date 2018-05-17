import React from "react";
import './Form.css';
import Stepper from '../components/Stepper.js';
import Toggle from '../components/Toggle.js';
import Calendar from '../components/Calendar.js';


import 'react-day-picker/lib/style.css';

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
      employeeAddress: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
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

  render() {
    const { currentStep } = this.state

    return (
      <div className="container">
        <div className="formBody">
          <div className="form-background">
            <div className="formText title"> Launch a Check </div>

            <form id="msform">
              {/* fieldsets */}
              {currentStep === 1 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Company Information </h2>
                    <input id="contactPersonName" name="contactPersonName" type="text" value={this.state.contactPersonName} onChange={this.handleInputChange} placeholder="Contact person's name" />
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
                    <div className="languageQuestion fr"> FR </div>
                    <div className="languageQuestion nl"> NL </div>
                    <div className="toggleLanguage">
                      <Toggle />
                    </div>
                  </div>
                </fieldset>
              }
              {currentStep === 3 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Check Details </h2>
                    <div className="toggleTitles optimizedCheck"> Optimized Check </div>
                    <div className="toggleDetailsText optimized"> Allows for the check to take place at the most opportune time of the incapacity period to maximize the chances of an early return to work </div>
                    <div className="toggle-1">
                      <Toggle />
                    </div>
                    <div className="toggleTitles immediateCheck"> Immediate Check </div>
                    <div className="toggleDetailsText immediate"> Allows for the check to happen in the shortest delays possible </div>

                    <div className="toggleTitles doctorsOffice"> At the doctor's cabinet </div>
                    <div className="toggleDetailsText doctor"> We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordacne with the positive approach that your employer has chosen to partake in </div>
                    <div className="toggle-2">
                      <Toggle />
                    </div>
                    <div className="toggleTitles atHome"> At the employee's home </div>
                    <div className="toggleDetailsText home"> Checks at home are recommended only in cases where the employee is required to stay home </div>

                  </div>
                </fieldset>
              }
              {currentStep === 4 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Incapacity Period </h2>
                    <div className="calendar">
                      <Calendar />
                    </div>
                  </div>
                </fieldset>
              }
              {currentStep === 5 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Comments </h2>

                    </div>
                </fieldset>
              }
            </form>

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
                <input type="submit" name="submit" className="submit action-button" value="Submit" />
              </div>
            }


            {/* BUTTONS
            <button className="next action-button" onClick={this.nextStep}> Next </button>
            <button className="prev action-button" onClick={this.prevStep}> Previous </button>
            <input type="submit" name="submit" className="submit action-button" value="Submit" /> */}

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
