import React from "react";
import './Form.css';
import Stepper from '../components/Stepper.js';

class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentStep: 1,
      numberOfStep: 5
    }
  }

  prevStep = () => {
    this.setState({currentStep: this.state.currentStep - 1});
  }

  nextStep = () => {
    this.setState({currentStep: this.state.currentStep + 1});
    return this.currentStep
  }

  render() {
    return (
      <div className="container">
        <div className="formBody">
          <div className="form-background">
            <div className="formText title"> Launch a Check </div>
              <form id="msform">
                {/* progressbar */}
                <Stepper currentStep={this.state.currentStep} numberOfStep={this.state.numberOfStep}/>

                {/* fieldsets */}
                {this.state.currentStep === 1 &&
                  <fieldset>
                    <h2 className="fs-title"> Company Information </h2>
                    <input type="text" name="contactPerson" placeholder="Contact person's name" />
                    <input type="text" name="contactEmail" placeholder="Email address" />


                  </fieldset>
                }

                {this.state.currentStep === 2 &&
                  <fieldset>
                    <h2 className="fs-title"> Employee Information </h2>
                    <input type="text" name="firstName" placeholder="First Name" />
                    <input type="text" name="lastName" placeholder="Last Name" />
                    <input type="text" name="employeeEmail" placeholder="Email address" />



                  </fieldset>
                }

                {this.state.currentStep === 3 &&
                  <fieldset>
                    <h2 className="fs-title"> Check Details </h2>



                  </fieldset>
                }

                {this.state.currentStep === 4 &&
                <fieldset>
                    <h2 className="fs-title"> Incapacity Period </h2>
                    <input type="text" name="startDate" placeholder="Start Date" />
                    <input type="text" name="endDate" placeholder="End Date" />



                  </fieldset>
                }

                {this.state.currentStep === 5 &&
                  <fieldset>
                    <h2 className="fs-title"> Comments </h2>
                    <input type="text" name="doctorComment" placeholder="This comment will only be seen by the concerned doctor" />
                    <input type="text" name="medicheckComment" placeholder="This comment will only be seen by Medicheck" />

                  </fieldset>
                }

                <button className="next action-button" onClick={this.nextStep}> Next </button>
                {/* <button className="prev action-button" onClick={this.prevStep}> Previous </button>
                 <input type="submit" name="submit" className="submit action-button" value="Submit" /> */}

              </form>
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
