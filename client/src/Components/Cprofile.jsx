import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom';
import { Spinner, Form, Button, Row, Col} from 'react-bootstrap';

function Cprofile() {

// for database

const [childname, setChildName] = useState();
const [gender, setGender] = useState();
const [guardianName, setGuardianName] = useState();
const [relationship, setRelationship ] = useState();
const [emergencyContactInfo, setEmergencyContactInfo] = useState();
const [addressLine1, setAddressLine1] = useState();
const [addressLine2, setAddressLine2] = useState();
const [addressLine3, setAddressLine3 ] = useState();
const [pickupPersonName , setPickupPersonName] = useState();
const [pickupPersonContactInfo, setPickupPersonContactInfo] = useState();
const [medicalConsent, SetMedicalConsent] = useState();
const [joiningDate, setJoiningDate] = useState(null);
const [lastDate, setLastDate] = useState(null);

const [registerLoading, setRegisterLoading] = useState(false);


const navigate = useNavigate();

const token = localStorage.getItem('token');

const handleJoiningDateChange = (date) => {
  setJoiningDate(date);
};

const handleLastDateChange = (date) => {
  setLastDate(date);
};

const handleSubmit = (e) => {
  e.preventDefault();

setRegisterLoading(true);

  const adjustedDob = new Date(dob);            //to avoid time zone => might be decrease 1 day from the dob in database
  adjustedDob.setDate(dob.getDate()+1);

  const adjustedJoiningDate = new Date(joiningDate);
  adjustedJoiningDate.setDate(joiningDate.getDate()+1);

  const adjustedLastDate = new Date(lastDate);
  adjustedLastDate.setDate(lastDate.getDate()+1);

  const formattedDob = adjustedDob.toISOString().split('T')[0];
  const formattedJoiningDate = adjustedJoiningDate.toISOString().split('T')[0];
  const formattedLastDate = adjustedLastDate.toISOString().split('T')[0];

  if (!token){

    alert('please login first');
    navigate('/login');
    setRegisterLoading(false);
    return;
  }

  axios.post('https://crud-main-server.vercel.app/profile', { childname, dob:formattedDob, gender, guardianName,relationship,emergencyContactInfo, addressLine1, addressLine2,addressLine3,  pickupPersonName,pickupPersonContactInfo, joiningFrom : formattedJoiningDate, joiningTo: formattedLastDate,medicalConsent},
  {

    headers:{
      Authorization: `Bearer ${token}`,
    }
  }
  
  )

    .then(result => {
      console.log(result);
      if(result.data === 'profile created'){
            
        setTimeout(() =>{
          window.history.replaceState(null, null, '/Account');
          navigate('/Account');
          setRegisterLoading(false);
        }, 2000 )
       
      }
    })
    .catch(err => console.log(err))
    
}
  const [dob, setDob] = useState(null);

  const currentDate = new Date();  // get the current date
  const currentYear = currentDate.getFullYear();

  const maxDate = new Date(currentDate);  
  const minDate = new Date(currentDate);
  
  maxDate.setFullYear(currentYear -1)
  minDate.setFullYear(currentYear -5); // set minDate to 5 years ago 

  const registrationDate = new Date ();
  registrationDate.setDate(registrationDate.getDate() +3)

  return (
    <div className='container-fluid'>

    <div className='profile-creation-form'>

      <Form onSubmit={handleSubmit} >

        <Row>
          <Col className='col-lg-4 mb-4'>
          
          <Form.Group>
            <Form.Label>Child's Name</Form.Label>
            <Form.Control type="text" className='input-box' name='childname' pattern='^[A-Za-z]+$' title='Use uppercase or lowercase letters only' minLength='3' maxLength='15' onChange={(e) => setChildName (e.target.value)} required/>
          </Form.Group>
        </Col>

        <Col className='col-lg-4 mb-4'>
        
        <Form.Group>
        <Form.Label>Date of Birth</Form.Label>
        <br />
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            name="dob"
            dateFormat="dd-MM-yyyy" 
            placeholderText='DD-MM-YYYY'
            className='form-control input-box'
            required
            minDate={minDate}
            maxDate={maxDate}
            onKeyDown={(e)=> e.preventDefault()}/>
        </Form.Group>
        </Col>
      
        <Col className='col-lg-4 mb-4'>
        <Form.Group>
          <Form.Label> Select Gender</Form.Label>

          <Form.Check type="radio" label='Boy' className='radio-btn' name='gender' value={'boy'} onChange={(e) => setGender (e.target.value)} required/>
          <Form.Check type="radio" label='Girl' className='radio-btn' name='gender' value={'girl'} onChange={(e) => setGender (e.target.value)} required/>
        </Form.Group>
        </Col>
        
        <Col className='col-lg-4 mb-4'>
        <Form.Group>
           <Form.Label> Guardian's Name</Form.Label>
           <Form.Control type="text" className='input-box' name='guardianName' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='3' maxLength='15' onChange={(e) => setGuardianName (e.target.value)} required/>
        </Form.Group>
        </Col>
        
        <Col className='col-lg-4 mb-4'>
        <Form.Group>
          <Form.Label> Relationship to child</Form.Label>

          <Form.Check type="radio" label='Father' className='radio-btn' name='relationship' value={'Father'} onChange={(e) => setRelationship (e.target.value)} required/>
          <Form.Check type="radio" label='Mother' className='radio-btn' name='relationship' value={'Mother'} onChange={(e) => setRelationship (e.target.value)}required/>
          <Form.Check type="radio" label='Legal Guardian' className='radio-btn' name='relationship' value={'Legal Guardian'} onChange={(e) => setRelationship (e.target.value)} required/>
        </Form.Group>
        </Col>

        <Col className='col-lg-4 mb-4'>
        <Form.Group>
          <Form.Label>Emergency Contact Number</Form.Label>
          <Form.Control type="tel" className='input-box' name="emergencyContactInfo" pattern="[0-9]{10}" title='enter 10 digit number' placeholder='+91'  onChange={(e) => setEmergencyContactInfo (e.target.value)} required />
        </Form.Group>
        </Col>

        <Col className='col-lg-4 mb-4'>
        <Form.Group>
          <Form.Label> Address</Form.Label>

           <Form.Control type="text" id="addressLine1" className='input-box' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='5' maxLength='20' name="addressLine1" placeholder="Address Line 1" onChange={(e) => setAddressLine1 (e.target.value)} required />
           <Form.Control type="text" id="addressLine2" className='input-box' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='5' maxLength='20' name="addressLine2"  placeholder="Address Line 2" onChange={(e) => setAddressLine2 (e.target.value)}required/>
           <Form.Control type="text" id="city" className='input-box' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='5' maxLength='20' name="addressLine3" placeholder="City" onChange={(e) => setAddressLine3 (e.target.value)} required />
        </Form.Group>
        </Col>
        
        <Col className='col-lg-4 mb-4'>
        <Form.Group>
          <Form.Label>Authorized PickUp Person</Form.Label>
          <Form.Control type="text" className='input-box' name='pickupPersonName' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='3' maxLength='15' placeholder='Name' onChange={(e) => setPickupPersonName (e.target.value)} required/>
          <Form.Control type="tel" className='input-box' name="pickupPersonContactInfo" pattern="[0-9]{10}" title='enter 10 digit number' placeholder="+91" onChange={(e) => setPickupPersonContactInfo (e.target.value)} required/>
        </Form.Group>  
        </Col>

        <Col className='col-lg-4 mb-4'>
        <Form.Group>
          <Form.Label>Schedule Date</Form.Label>
          <br />
          
            <DatePicker
              selected={joiningDate}
              onChange={handleJoiningDateChange}
              minDate={registrationDate}
              dateFormat="dd-MM-yyyy"
              name='joiningFrom'
              className="input-box form-control"
              placeholderText="From"
              onKeyDown={(e)=> e.preventDefault()}
              required
            />

            <DatePicker
              selected={lastDate}
              onChange={handleLastDateChange}
              minDate={joiningDate} // Set the minimum date for the last date
              dateFormat="dd-MM-yyyy"
              name='joiningTo'
              className="input-box form-control"
              placeholderText="To"
              onKeyDown={(e)=> e.preventDefault()}
              required
            />     
        </Form.Group>  
        </Col>
        
        <Col className='col-lg-8 mb-4 '>
        <Form.Group>
          <Form.Label>Emergency Medical Consent</Form.Label>

           <Form.Check type="radio" label='I give my consent for emergency medical treatment for my child, when immediate medical attention is required.' name='medicalConsent'className='radio-btn' value={'I give my consent for emergency medical treatment for my child, when immediate medical attention is required.'} onChange={(e) => SetMedicalConsent(e.target.value)} required/>

           <Form.Check type="radio" label='I do not wish to provide consent. I understand the DayCare will attempt to contact Emergency-Contact-Person first.' name='medicalConsent' className='radio-btn' value={'I do not wish to provide consent. I understand the DayCare will attempt to contact Emergency-Contact-Person first.'} onChange={(e) => SetMedicalConsent(e.target.value)} required/>
        </Form.Group> 
        </Col>
        
        
       
       <Form.Group>
          <Button type='submit' className='register-btn bg-primary' disabled={registerLoading}> 
           {registerLoading ? <Spinner animation='border' size='md'/> : 'Register' }
          </Button>
        </Form.Group>
        

        
        
        
        </Row>

      </Form>
        
    </div>
    </div>
    
  );
}

export default Cprofile;
