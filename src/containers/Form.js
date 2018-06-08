/*global google*/
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
      contactPersonFirstName: "",
      contactPersonLastName: "",
      contactEmail: "",
      contactPhoneNumber: "",
      companyName: "",
      employeeFirstName: "",
      employeeLastName: "",
      employeePhoneNumber: "",
      employeeAddress: "",
      employeePosition: "",
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
      imagePreviews: [],
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
    // let immediateIcon = document.getElementById("immediateIcon");
    // this.state.optimizedCheck === true? immediateIcon.classList.remove("toggleActive") : immediateIcon.classList.add("toggleActive")
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
    this.setState({imagePreviews: [event.target.files]})
    this.setState({medicalCertificate: event.target.files})
    
    // Working preview based on state but DOESNT get saved after next (adds to DOM..)
    // if (event.target.files && event.target.files[0]) {
    //   $("#imagePreview").empty();
    //   $(event.target.files).each(function () {
    //       var reader = new FileReader();
    //       reader.readAsDataURL(this);
    //       reader.onload = function (e) {
    //         $("#imagePreview").append("<li><img class='thumb' style='height:130px' src='" + e.target.result + "'></br></li>");
    //       }
    //   });
    // }

    // Multiple Image Preview
    if (event.target.files && event.target.files[0]) {
      const images = this.state.imagePreviews
      // console.log(event.target.files)
      let myFiles = this.state.medicalCertificate
      for (let file of event.target.files) {
        myFiles.push(file)
      }
      myFiles.map(file => {
        // console.log(myFiles.length)
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          images.push(reader.result)
          // console.log('test actuel', images)
          this.setState({imagePreviews: images})
          this.setState({medicalCertificate: images}) 
        }
      })
    }
    let Move = document.getElementById("certificateImageUploader")
    Move.classList.add("moveUploader")
    let Disable = document.getElementById("medicalCertificateTitle")
    Disable.classList.add("disable")
  }
  onDoctorImageChange = event => {
    this.setState({'doctorImages': event.target.files})
    if (event.target.files && event.target.files[0]) {
      $("#doctorPreview").empty();
      let i
      for (i = 0; i < event.target.files.length; i++) {
        $("#doctorPreview").append("<li><p> "+ event.target.files[i].name +"</p></li>")  
      }
    }
  }
  onMedicheckImageChange = event => {
    this.setState({'medicheckImages': event.target.files})
    if (event.target.files && event.target.files[0]) {
      $("#medicheckPreview").empty();
      let i
      for (i = 0; i < event.target.files.length; i++) {
        $("#medicheckPreview").append("<li><p> "+ event.target.files[i].name +"</p></li>")  
      }
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
    // toggle statement conversions from true to FR
    const spokenLanguage = this.state.employeeLanguage === false? "FR" : "NL"
    const optimizedCheckIf = this.state.optimizedCheck === false? "Optimized Check" : "Immediate Check"
    const checkLocation = this.state.atHome === false? "At the doctor's cabinet" : "At the employee's home"
    
    // saying what data to be sent to the server
    const payload = {
      contactPersonFirstName: this.state.contactPersonFirstName,
      contactPersonLastName: this.state.contactPersonLastName,
      contactEmail: this.state.contactEmail,
      contactPhoneNumber: this.state.contactPhoneNumber,
      companyName: this.state.companyName,
      employeeFirstName: this.state.employeeFirstName,
      employeeLastName: this.state.employeeLastName,
      employeePhoneNumber: this.state.employeePhoneNumber,
      employeeAddress: this.state.employeeAddress,
      employeePosition: this.state.employeePosition,
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

    this.setState({currentStep: this.state.currentStep + 1});
  }

    // GOOGLE MAPS
  // initializeAutocomplete = (id) =>{
  //     const element = document.getElementById(id);
  //     if (element) {
  //       const autocomplete = new google.maps.places.Autocomplete(element, { types: ['geocode'] });
  //       // google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
  //     }
  //   }

    
 

  render() {
    const { currentStep } = this.state
    
    // GOOGLE MAPS AUTOCOMPLETE ADDRESS
    // google.maps.event.addDomListener(window, 'load',
    //   this.initializeAutocomplete('user_input_autocomplete_address')
    // );

    // const autocompleteFormField = document.getElementById("street-address-field");
    // const autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
    //   types: [`address`],
    //   componentRestrictions: [`us`],
    // });
    

    return (
      <div className="container">
        <div className="formBody">
          <div className="form-background">
            <div className="formText title"> Lancer un Check </div>

            <form id="msform">
{/* SLIDE 1 */}
              {currentStep === 1 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> INFORMATION ENTREPRISE </h2>
                    
                   
                    <div className="form-group" id="contactPersonFirstName">
                      <input className="form-control" required name="contactPersonFirstName" type="text" value={this.state.contactPersonFirstName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactPersonFirstName">Prénom</label>
                    </div>
                    <div className="form-group" id="contactPersonLastName">
                      <input className="form-control" required name="contactPersonLastName" type="text" value={this.state.contactPersonLastName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactPersonLastName">Nom</label>
                    </div>
                    <div className="form-group" id="contactEmail">
                      <input className="form-control" required name="contactEmail" type="email" value={this.state.contactEmail} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactEmail">Adresse email</label>
                    </div>
                    <div className="form-group" id="contactPhoneNumber">
                      <input className="form-control" required name="contactPhoneNumber" type="text" value={this.state.contactPhoneNumber} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="contactPhoneNumber">Numéro de téléphone</label>
                    </div>
                    <div className="form-group" id="companyName">
                      <input className="form-control" required name="companyName" type="text" value={this.state.companyName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="companyName">Nom de l'entreprise</label>
                    </div>
                  </div>
                </fieldset>
              }
{/* SLIDE 2 */}
              {currentStep === 2 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> INFORMATION SALARIE </h2>

                    {/* FIRST NAME */}
                    <div className="form-group" id="employeeFirstName">
                      <input className="form-control" required name="employeeFirstName" type="text" value={this.state.employeeFirstName} onChange={this.handleInputChange}/>
                      <label className="form-control-placeholder" htmlFor="employeeFirstName">Prénom</label>
                    </div>
                    
                    {/* LAST NAME */}
                    <div className="form-group" id="employeeLastName">
                      <input className="form-control" required name="employeeLastName" type="text" value={this.state.employeeLastName} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="employeeLastName">Nom</label>
                    </div>
                    

                    {/* PHONE NUMBER */}
                    <div className="form-group" id="employeePhoneNumber">
                      <input className="form-control" required name="employeePhoneNumber" type="tel" pattern="^((02|\+32|0032)[1-9][0-9]{6})|((0|\+32|0032)[1-9][0-9]{8})$" value={this.state.employeePhoneNumber} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="employeePhoneNumber">Numéro de téléphone</label>
                    </div>

                    {/* EMPLOYEE ADDRESS */}

                    <div className="form-group" id="employeeAddress">
                      <input id="employeeAddress" className="form-control" required name="employeeAddress" type="text" value={this.state.employeeAddress} onChange={this.handleInputChange} placeholder="" />
                      <label className="form-control-placeholder" htmlFor="employeeAddress">Adresse postale</label>
                    </div>
                    
                    {/* EMPLOYEE POSITION */}
                    <div className="form-group" id="employeePosition">
                      <input id="employeePosition" className="form-control" required name="employeePosition" type="text" value={this.state.employeePosition} onChange={this.handleInputChange} placeholder="" />
                      <label className="form-control-placeholder" htmlFor="employeePosition">Rôle du salarié</label>
                    </div>

                    <div className="languageQuestion"> Le salarié parle le </div>

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
{/* SLIDE 3 */}
              {currentStep === 3 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> DETAILS DU CHECK </h2>

                    {/* Toggle Options */}

                      <div id="optimized" className={"toggleTitles optimizedCheck " + (this.state.optimizedCheck ? '' : 'toggleActive')} > Check optimisé </div>
                      <div id="optimizedDetails" className={"toggleDetailsText left " + (this.state.optimizedCheck ? '' : 'toggleActiveDetails')}> Permet d’effectuer le contrôle au moment le plus opportun de la période d’incapacité, maximisant le chances d’un retour anticipé </div>
                      {/* <div id="optimizedDropdown"> */}
                      {/* <i id="optimizedIcon" className={"fas fa-info " + (this.state.optimizedCheck ? '' : 'toggleActive')} onClick={this.toggleDropdownOptimized}></i>
                        <div id="optimizedDropdownContent" className="dropDownBackground leftNudge disable">
                          <p> Allows for the check to take place at the most opportune time of the incapacity period to maximize the chances of an early return to work </p>
                        </div>
                      </div> */}
                    
                      <div id="immediate" className={"toggleTitles immediateCheck " + (this.state.optimizedCheck ? 'toggleActive' : '')}> Check immédiat </div>
                      <div id="immediateDetails" className={"toggleDetailsText " + (this.state.optimizedCheck ? 'toggleActiveDetails' : '')}> Permet d’effectuer le contrôle dans les plus brefs délais</div>
                      {/* <div id="immediateDropdown">
                        <i id="immediateIcon" className={"fas fa-info " + (this.state.optimizedCheck ? 'toggleActive' : '')} onClick={this.toggleDropdownImmediate}></i>
                        <div id="immediateDropdownContent" className="dropDownBackground rightNudge disable ">
                          <p> Allows for the check to happen in the shortest delays possible</p>
                        </div>
                      </div> */}

                    <div className="toggle-1">
                      <label className="switch">
                      <input name="optimizedCheck" type="checkbox" checked={this.state.optimizedCheck} onChange={this.handleInputChange} onClick={this.toggleCssCheckDetails}/>
                        <div className="slider"></div>
                      </label>
                    </div>

                    <div id="doctorsOffice" className={"toggleTitles doctorsOffice " + (this.state.atHome ? '' : 'toggleActive')}> Au cabinet médical </div>
                    <div id="doctorsOfficeDetails" className={"toggleDetailsText left " + (this.state.atHome ? '' : 'toggleActiveDetails')}> Nous encourageons cette démarche qui est plus respectueuse de l’intimité du salarié et qui est en ligne avec l’approche positive que votre employeur a décidé de promouvoir </div>
                    {/* <div id="doctorDropdown">
                      <i id="doctorIcon" className={"fas fa-info " + (this.state.atHome ? '' : 'toggleActive')} onClick={this.toggleDropdownDoctor}></i>
                        <div id="doctorDropdownContent" className="dropDownBackground leftNudge disable">
                          <p> We recommend this choice as it is more respectful of the employee’s intimacy and is thus in accordance with the positive approach that your employer has chosen to partake in </p>
                        </div>
                      </div> */}
                    
                    
                    <div id="atHome" className={"toggleTitles atHome " + (this.state.atHome ? 'toggleActive' : '')}> Au domicile de l'employé </div>
                    <div id="atHomeDetails" className={"toggleDetailsText " + (this.state.atHome ? 'toggleActiveDetailsHome' : '')}> Les checks à domicile sont utiliser uniquement en cas de sortie non-autorisée du salarié</div>
                    {/* <div id="atHomeDropdown">
                        <i id="atHomeIcon" className={"fas fa-info " + (this.state.atHome ? 'toggleActive' : '')} onClick={this.toggleDropdownAtHome}></i>
                        <div id="atHomeDropdownContent" className="dropDownBackground rightNudge disable ">
                          <p> Checks at home are recommended only in cases where the employee is required to stay home </p>
                        </div>
                      </div> */}

                    <div className="toggle-2">
                      <label className="switch">
                      <input name="atHome" type="checkbox" checked={this.state.atHome} onChange={this.handleInputChange} onClick={this.toggleCssLocation}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    
                  </div>
                </fieldset>
              }
{/* SLIDE 4 */}
              {currentStep === 4 &&
                
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> PERIODE D'INCAPACITE DE TRAVAIL </h2>
                    <div className="calendarTitle"> 
                      <p> Veuillez indiquer la date de début et/ou de fin de la période </p>
                    </div>
                    <div className="calendar">
                      <DateRangePicker 
                        startDateId="startDate"
                        startDatePlaceholderText="Début"
                        endDateId="endDate"
                        endDatePlaceholderText="Fin"
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
                    <div id="medicalCertificateTitle" >
                      <p> Si disponible, veuillez joindre une copie du certificat médical </p>
                    </div>
                    <div id="certificateImageUploader" className={"certificateImageUploader " + (this.state.imagePreviews ? '' : 'moveUploader')} >
                      <input type="file" name="medicalCertificate" onChange={this.onImageChange.bind(this)} id="medicalCertificate" multiple/>
                      <label htmlFor="medicalCertificate">Insérer fichier(s)</label>
                    </div>
                      <ul id="imagePreview" className="imagePreview">
                          { this.state.imagePreviews.map(image => {
                            // console.log("test",image.length)
                            return(<li>
                                <img key={image.length} className='thumb' style={{height:'130px'}} src={image} alt=""/>
                                <br/>
                              </li>)
                          })}
                      </ul>
                  </div>
                </fieldset>
              }
{/* SLIDE 5 */}
              {currentStep === 5 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title"> COMMENTAIRES </h2>

                    {/* COMMENT FOR THE DOCTOR */}
                    <div className="form-group" id="commentDoctor">
                      <textarea className="form-control" name="commentDoctor" required value={this.state.commentDoctor} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="commentDoctor">Votre commentaire pour le docteur...</label>
                    </div>
                    <div className="doctorImageUploader" >
                      <input type="file" onChange={this.onDoctorImageChange.bind(this)} id="doctorImages" multiple/>
                      <label htmlFor="doctorImages" className="otherImageUpload" >Insérer fichier(s)</label>
                    </div>
                    <div className="doctorImagePreview">
                        <ul id="doctorPreview" className="doctorPreview"></ul>
                    </div>

                    {/* COMMENT FOR MEDICHECK */}
                    <div className="form-group" id="commentMedicheck">
                      <textarea className="form-control" name="commentMedicheck" required value={this.state.commentMedicheck} onChange={this.handleInputChange} />
                      <label className="form-control-placeholder" htmlFor="commentMedicheck">Votre commentaire pour Medicheck</label>
                    </div>
                    <div className="medicheckImageUploader" >
                      <input type="file" onChange={this.onMedicheckImageChange.bind(this)} id="medicheckImages" multiple/>
                      <label htmlFor="medicheckImages" className="otherImageUpload">Insérer fichier(s)</label> 
                    </div>
                    <div className="medicheckImagePreview">
                        <ul id="medicheckPreview" className="doctorPreview"></ul>
                    </div>
                    
                    </div>
                </fieldset>
              }
{/* SLIDE 6 */}
                {currentStep === 6 &&
                <fieldset className={this.state.animationSide}>
                  <div className="grid-display">
                    <h2 className="fs-title completeFormTitle"> Le check a été correctement rempli et réceptionné par notre équipe a Medicheck </h2>
                    <img alt="" className="vCheck" src={require('../images/Vcheck.png')} />
                    <h3 className="confirmationText"> Un mail de confirmation a été envoyé à {this.state.contactEmail} </h3>
                    
                  </div>
                </fieldset>
              }
            </form>

{/* BUTTONS */}
            {currentStep === 1 &&
              <div className="button-placement">
                <button className="next action-button" onClick={this.nextStep}> Suivant </button>
              </div>
            }
            {currentStep >= 2 && currentStep <= 4 &&
              <div className="button-placement">
                <button className="prev action-button" onClick={this.prevStep}> Précédent </button>
                <button className="next action-button" onClick={this.nextStep}> Suivant </button>
              </div>
            }
            {currentStep === 5 &&
              <div className="button-placement">
                <button className="prev action-button" onClick={this.prevStep}> Précédent </button>
                <button className="submit action-button" onClick={this.submitStep}> Envoi </button>
              </div>
            }
            {currentStep === 6 &&
              <div className="medicheckLink">
                <a className="action-button link" href="https://www.medicheck.io/"> retourner sur medicheck.io </a>
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
