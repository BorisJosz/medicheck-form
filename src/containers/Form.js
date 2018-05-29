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
import $ from 'jquery';

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
      medicalCertificate: [],
      doctorImages: [],
      medicheckImages: [],
      previews: null,
    };
  }


  // TOGGLE CSS FUNCTIONS
  toggleCssLanguage = () => {
    let Fr = document.getElementById("fr");
    this.state.employeeLanguage === true ? Fr.classList.add("toggleActive") : Fr.classList.remove("toggleActive");
    let Nl = document.getElementById("nl");
    this.state.employeeLanguage === true ? Nl.classList.remove("toggleActive") : Nl.classList.add("toggleActive");
  }
  toggleCssCheckDetails = () => {
    let Op = document.getElementById("optimized");
    this.state.optimizedCheck === true ? Op.classList.add("toggleActive") : Op.classList.remove("toggleActive");
    let Im = document.getElementById("immediate");
    this.state.optimizedCheck === true ? Im.classList.remove("toggleActive") : Im.classList.add("toggleActive");
  }
  toggleCssLocation = () => {
    let Do = document.getElementById("doctorsOffice");
    this.state.atHome === true ? Do.classList.add("toggleActive") : Do.classList.remove("toggleActive");
    let Ah = document.getElementById("atHome");
    this.state.atHome === true ? Ah.classList.remove("toggleActive") : Ah.classList.add("toggleActive");
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
  }

  // image handler
  onImageChange = event => {
    this.setState({'medicalCertificate': event.target.files})
    let Move = document.getElementById("certificateImageUploader")
    Move.classList.add("moveUploader")
    // Multiple Image Preview
    if (event.target.files && event.target.files[0]) {
      $("#imagePreview").empty();
      $(event.target.files).each(function () {
          var reader = new FileReader();
          reader.readAsDataURL(this);
          reader.onload = function (e) {
            $("#imagePreview").append("<li><img class='thumb' style='height:130px' src='" + e.target.result + "'></br></li>");
          }
      });
    }
   
  }
 
  onDoctorImageChange = event => {
    this.setState({'doctorImages': event.target.files})
  }
  onMedicheckImageChange = event => {
    this.setState({'medicheckImages': event.target.files})
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
    // toggle statement conversions from true to FR
    const spokenLanguage = this.state.employeeLanguage === false? "FR" : "NL"
    const optimizedCheckIf = this.state.optimizedCheck === false? "Optimized Check" : "Immediate Check"
    const checkLocation = this.state.atHome === false? "At the doctor's cabinet" : "At the employee's home"
    
    // saying what data to be sent to the server
    const payload = {
      contactPersonName: this.state.contactPersonName,
      contactEmail: this.state.contactEmail,
      employeeFirstName: this.state.employeeFirstName,
      employeeLastName: this.state.employeeLastName,
      employeePhoneNumber: this.state.employeePhoneNumber,
      employeeAddress: this.state.employeeAddress,
      employeeLanguage: spokenLanguage,
      optimizedCheck: optimizedCheckIf,
      atHome: checkLocation,
      startDate: moment(this.state.startDate).format("MMMM D, YYYY"),
      endDate: moment(this.state.endDate).format("MMMM D, YYYY"),
      commentDoctor: this.state.commentDoctor,
      commentMedicheck: this.state.commentMedicheck,
    }

    // setting usable variables to host images
    const medicalCertificate = this.state.medicalCertificate
    const doctorImages = this.state.doctorImages
    const medicheckImages = this.state.medicheckImages

    // initializing formData to fill with images + payload
    const formData = new FormData()
    // image append
    let i
    for (i = 0; i < 4; i++) {
    formData.append('medicalCertificate', medicalCertificate[i])
    formData.append('doctorImages', doctorImages[i])
    formData.append('medicheckImages', medicheckImages[i])
    }
    // all other input append...
    formData.append('payload', JSON.stringify(payload))

    // post request with axios    
    axios({
      method: 'post',
      url: 'http://localhost:3000/',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
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
                    <div id="fr" className={"languageQuestion fr " + (this.state.employeeLanguage ? '' : 'toggleActive')}> FR </div>
                    <div id="nl" className={"languageQuestion nl " + (this.state.employeeLanguage ? 'toggleActive' : '')}> NL </div>

                    {/* TOGGLE */}
                    <div className="toggleLanguage">
                      <label className="switch">
                        <input name="employeeLanguage" type="checkbox" checked={this.state.employeeLanguage} onChange={this.handleInputChange} onClick={this.toggleCssLanguage}/>
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
                      <div id="optimized" className={"toggleTitles optimizedCheck " + (this.state.optimizedCheck ? '' : 'toggleActive')} title="Allows for the check to take place at the most opportune time of the incapacity period to maximize the chances of an early return to work"> Optimized Check </div>
                      <div id="immediate" className={"toggleTitles immediateCheck " + (this.state.optimizedCheck ? 'toggleActive' : '')} title="Allows for the check to happen in the shortest delays possible"> Immediate Check </div>

                    <div className="toggle-1">
                      <label className="switch">
                      <input name="optimizedCheck" type="checkbox" checked={this.state.optimizedCheck} onChange={this.handleInputChange} onClick={this.toggleCssCheckDetails}/>
                        <div className="slider"></div>
                      </label>
                    </div>

                    <div id="doctorsOffice" className={"toggleTitles doctorsOffice " + (this.state.atHome ? '' : 'toggleActive')} title="We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordance with the positive approach that your employer has chosen to partake in"> At the doctor's cabinet </div>
                    <div id="atHome" className={"toggleTitles atHome " + (this.state.atHome ? 'toggleActive' : '')} title="Checks at home are recommended only in cases where the employee is required to stay home"> At the employee's home </div>
                    
                    <div className="toggle-2">
                      <label className="switch">
                      <input name="atHome" type="checkbox" checked={this.state.atHome} onChange={this.handleInputChange} onClick={this.toggleCssLocation}/>
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
                    <div id="certificateImageUploader" className="certificateImageUploader" >
                      <input type="file" name="medicalCertificate" onChange={this.onImageChange.bind(this)} id="medicalCertificate" multiple/>
                      <label htmlFor="medicalCertificate">Upload file(s)</label>
                    </div>
                    <ul id="imagePreview" className="imagePreview">
                    </ul>
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
                    <div className="doctorImageUploader" >
                      <input type="file" onChange={this.onDoctorImageChange.bind(this)} id="doctorImages" multiple/>
                      <label htmlFor="doctorImages" className="otherImageUpload" >Upload file(s)</label>
                    </div>
                    {/* <div className="doctorImagePreview">
                      <img src={this.state.doctorPreview} height="50" alt=""></img>
                    </div> */}
                   
                    {/* COMMENT FOR MEDICHECK */}
                    <div className="form-group" id="commentMedicheck">
                      <textarea className="form-control" required name="commentMedicheck" value={this.state.commentMedicheck} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="commentMedicheck">Leave your comment for Medicheck here..</label>
                    </div>
                    <div className="medicheckImageUploader" >
                      <input type="file" onChange={this.onMedicheckImageChange.bind(this)} id="medicheckImages" multiple/>
                      <label htmlFor="medicheckImages" className="otherImageUpload">Upload file(s)</label> 
                    </div>
                    {/* <div className="medicheckImagePreview">
                      <img src={this.state.medicheckPreview} height="50" alt=""></img>
                    </div> */}
                    
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
