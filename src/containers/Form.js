import React from "react";
import './Form.css';
import Stepper from '../components/Stepper.js';

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 1,
      numberOfStep: 5,
      animationSide: "slideLeft"
    }
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
                <fieldset class={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Company Information </h2>
                    <input type="text" id="contactPersonName" placeholder="Contact person's name" />
                    <input type="text" id="contactEmail" placeholder="Email address" />
                  </div>
                </fieldset>
              }
              {currentStep === 2 &&
                <fieldset class={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Employee Information </h2>
                    <input type="text" id="employeeFirstName" placeholder="First Name" />
                    <input type="text" id="employeeLastName" placeholder="Last Name" />
                    <input type="text" id="employeeEmail" placeholder="Email address" />
                    <input type="text" id="employeePhoneNumber" placeholder="Phone number" />
                  </div>
                </fieldset>
              }
              {currentStep === 3 &&
                <fieldset class={this.state.animationSide}>
                  <h2 className="fs-title"> Check Details </h2>
                </fieldset>
              }
              {currentStep === 4 &&
              <fieldset class={this.state.animationSide}>
                  <h2 className="fs-title"> Incapacity Period </h2>
                  <input type="text" name="startDate" placeholder="Start Date" />
                  <input type="text" name="endDate" placeholder="End Date" />
                </fieldset>
              }
              {currentStep === 5 &&
                <fieldset class={this.state.animationSide}>
                  <h2 className="fs-title"> Comments </h2>
                  <input type="text" name="doctorComment" placeholder="This comment will only be seen by the concerned doctor" />
                  <input type="text" name="medicheckComment" placeholder="This comment will only be seen by Medicheck" />
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
