import React from "react";
import './FormSlide.css';
import Stepper from '../components/Stepper.js';

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 1,
      numberOfStep: 5
    }
  }

  nextStep = () => {
    this.setState({currentStep: this.state.currentStep + 1});
  }

  render() {
    return (
      <form id="msform">
        {/* progressbar */}
        <Stepper currentStep={this.state.currentStep} numberOfStep={this.state.numberOfStep}/>

        {/* fieldsets */}
        {this.state.currentStep === 1 &&
          <fieldset>
            <h2 className="fs-title"> Company Information </h2>
            <h3 className="fs-subtitle"> This is step 1 </h3>
            <input type="text" name="contactPerson" placeholder="Contact person's name" />
            <input type="text" name="contactEmail" placeholder="Email address" />
            <br></br>
            <button className="next" onClick={this.nextStep}>
              Next
            </button>
          </fieldset>
        }

        {this.state.currentStep === 2 &&
          <fieldset>
            <h2 className="fs-title"> Employee Information </h2>
            <h3 className="fs-subtitle"> This is step 2 </h3>
            <input type="text" name="firstName" placeholder="First Name" />
            <input type="text" name="lastName" placeholder="Last Name" />
            <input type="text" name="employeeEmail" placeholder="Email address" />
            <input type="button" name="previous" className="previous action-button" value="Previous" />
            <input type="button" id="next" name="next" className="next action-button" value="Next" />
          </fieldset>
        }

        <fieldset>
          <h2 className="fs-title"> Check Details </h2>
          <h3 className="fs-subtitle"> This is step 3 </h3>
          <input type="button" name="previous" className="previous action-button" value="Previous" />
          <input type="button" name="next" className="next action-button" value="Next" />
        </fieldset>

        <fieldset>
          <h2 className="fs-title"> Incapacity Period </h2>
          <h3 className="fs-subtitle"> This is step 4 </h3>
          <input type="text" name="startDate" placeholder="Start Date" />
          <input type="text" name="endDate" placeholder="End Date" />
          <input type="button" name="previous" className="previous action-button" value="Previous" />
          <input type="button" name="next" className="next action-button" value="Next" />
        </fieldset>

        <fieldset>
          <h2 className="fs-title"> Comments </h2>
          <h3 className="fs-subtitle"> This is step 5 </h3>
          <input type="text" name="doctorComment" placeholder="This comment will only be seen by the concerned doctor" />
          <input type="text" name="medicheckComment" placeholder="This comment will only be seen by Medicheck" />
          <input type="button" name="previous" className="previous action-button" value="Previous" />
          <input type="submit" name="submit" className="submit action-button" value="Submit" />
        </fieldset>

        </form>
    )
  }
}

export default Form;

// const slide =
// <div className="formSlide">
 // <div className="formText testText">STEP 1</div>
// </div>





