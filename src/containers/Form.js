import React from "react";

// other file imports
import './Form.css';
import './Label.css';
import Stepper from '../components/Stepper.js';
import '../components/Toggle.css';
import './api.js';

// added stuff
import axios from 'axios';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

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
      medicalCertificate: null,
      preview: null,
    };
  }


  // TOGGLE CSS FUNCTIONS
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

  // EVENT HANDLERS
  // input handler
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox'? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(event.target.checked)
  }
  // image handler
  onImageChange = event => {
    this.setState({'medicalCertificate': event.target.files[0]})
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({preview: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // button handlers
  prevStep = () => {
    this.setState({currentStep: this.state.currentStep - 1});
    this.setState({animationSide: "slideRight"})
  }
  nextStep = () => {
    this.setState({currentStep: this.state.currentStep + 1});
    this.setState({animationSide: "slideLeft"})
  }
  submitStep = (path, document, newName) => {
    console.log(this.state.employeeLanguage)
    // let spokenLanguage;
    // if (this.state.employeeLanguage) {
    //   spokenLanguage = "NL"
    // } else { 
    //   spokenLanguage = "FR"
    // }

    // let optimizedCheckIf;
    // if (this.state.employeeLanguage) {
    //   optimizedCheckIf = "Immediate Check"
    // } else { 
    //   optimizedCheckIf = "Optimized Check"
    // }

    // let checkLocation;
    // if (this.state.atHome) {
    //   checkLocation = "At the employee's home"
    // } else { 
    //   checkLocation = "At the doctor's cabinet"
    // }

    // const payload = {
    //   contactPersonName: this.state.contactPersonName,
    //   contactEmail: this.state.contactEmail,
    //   employeeFirstName: this.state.employeeFirstName,
    //   employeeLastName: this.state.employeeLastName,
    //   employeePhoneNumber: this.state.employeePhoneNumber,
    //   employeeAddress: this.state.employeeAddress,
    //   employeeLanguage: spokenLanguage,
    //   optimizedCheck: optimizedCheckIf,
    //   atHome: checkLocation,
    //   startDate: moment(this.state.startDate).format("MMMM D, YYYY"),
    //   endDate: moment(this.state.endDate).format("MMMM D, YYYY"),
    //   commentDoctor: this.state.commentDoctor,
    //   commentMedicheck: this.state.commentMedicheck,
    // }
    // const medicalCertificate = this.state.medicalCertificate
    // const formData = new FormData()
    // formData.append('medicalCertificate', medicalCertificate)
    // formData.append('payload', JSON.stringify(payload))
    // // axios.post(`http://localhost:3000/`, formData)
    
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/',
    //   data: formData,
    //   config: { headers: {'Content-Type': 'multipart/form-data' }}
    // })
      
    // .then(function (response) {
    //   //handle success
    //   console.log(response);
    // })
    // .catch(function (response) {
    //   //handle error
    //   console.log(response);
    // });
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
                    
                    <div className="form-group" id="contactPersonName">
                      <input className="form-control" required name="contactPersonName" type="text" value={this.state.contactPersonName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactPersonName">Contact Person's name</label>
                    </div>
                    <div className="form-group" id="contactEmail">
                      <input className="form-control" required name="contactEmail" type="text" value={this.state.contactEmail} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactEmail">Email address</label>
                    </div>
                  </div>
                </fieldset>
              }
              {currentStep === 2 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Employee Information </h2>

                    {/* FIRST NAME */}
                    <div className="form-group" id="employeeFirstName">
                      <input className="form-control" required name="employeeFirstName" type="text" value={this.state.employeeFirstName} onChange={this.handleInputChange}/>
                      <label className="form-control-placeholder" htmlFor="employeeFirstName">First Name</label>
                    </div>
                    
                    {/* LAST NAME */}
                    <div className="form-group" id="employeeLastName">
                      <input className="form-control" required name="employeeLastName" type="text" value={this.state.employeeLastName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="employeeLastName">Last Name</label>
                    </div>
                    

                    {/* PHONE NUMBER */}
                    <div className="form-group" id="employeePhoneNumber">
                      <input className="form-control" required name="employeePhoneNumber" type="text" value={this.state.employeePhoneNumber} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="employeePhoneNumber">Phone Number</label>
                    </div>

                    {/* EMPLOYEE ADDRESS */}
                    <div className="form-group" id="employeeAddress">
                      <input className="form-control" required name="employeeAddress" type="text" value={this.state.employeeAddress} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="employeeAddress">Street Address</label>
                    </div>
                    

                    <div className="languageQuestion"> The employee speaks </div>

                    {/* Toggle options */}
                    <div id="fr" className="languageQuestion fr toggleActive"> FR </div>
                    <div id="nl" className="languageQuestion nl"> NL </div>

                    {/* TOGGLE */}
                    <div className="toggleLanguage">
                      <label className="switch">
                        <input name="employeeLanguage" type="checkbox" checked={this.state.employeeLanguage} onChange={this.handleInputChange}/>
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
                      <input name="optimizedCheck" type="checkbox" checked={this.state.optimizedCheck} onChange={this.handleInputChange}/>
                        <div className="slider"></div>
                      </label>
                    </div>

                    <div id="doctorsOffice" className="toggleTitles doctorsOffice toggleActive" title="We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordance with the positive approach that your employer has chosen to partake in"> At the doctor's cabinet </div>
                    {/* <div className="toggleDetailsText doctor"> We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordacne with the positive approach that your employer has chosen to partake in </div> */}
                    <div id="atHome" className="toggleTitles atHome" title="Checks at home are recommended only in cases where the employee is required to stay home"> At the employee's home </div>
                    {/* <div className="toggleDetailsText home"> Checks at home are recommended only in cases where the employee is required to stay home </div> */}
                    
                    <div className="toggle-2">
                      <label className="switch">
                      <input name="atHome" type="checkbox" checked={this.state.atHome} onChange={this.handleInputChange}/>
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
                          // if (!focusedInput) return;
                          this.setState({ focusedInput })}}
                        displayFormat="MMM D, YYYY"
                      />
                    </div>

{/* IMAGE UPLOADER */}
                    <div className="certificateImageUploader" >
                      <input type="file" onChange={this.onImageChange.bind(this)} id="medicalCertificate"/>
                      {/* <label htmlFor="medicalCertificate">Upload file</label> */}
                    </div>
                    <div className="imagePreview">
                      <img src={this.state.preview} height="200" alt=""></img>
                    </div>
                  </div>
                </fieldset>
              }
              {currentStep === 5 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> Comments </h2>

                    {/* COMMENT FOR THE DOCTOR */}
                    <div className="form-group" id="commentDoctor">
                      <textarea className="form-control" required name="commentDoctor" value={this.state.commentDoctor} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="commentDoctor">Leave your comment for the doctor here..</label>
                    </div>
                   
                    {/* COMMENT FOR MEDICHECK */}
                    <div className="form-group" id="commentMedicheck">
                      <textarea className="form-control" required name="commentMedicheck" value={this.state.commentMedicheck} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="commentMedicheck">Leave your comment for Medicheck here..</label>
                    </div>
                    
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
