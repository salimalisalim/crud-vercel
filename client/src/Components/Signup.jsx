import React, { useState } from 'react';
import {Form,Button, Modal, Spinner}  from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {

  const [childName, setChildName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [showAlert, setShowAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading (true);
  axios.post('https://crud-vercel-n94pklfps-salimalisalim.vercel.app/register', { childName, email, password })
    .then(result => {
      console.log(result);

      setTimeout(() => {

      // Check if the signup was successful before redirecting
      if (result.data === 'Account created') {
        
        // Redirect to the login page
        navigate('/Login');
      }else
      {
        setShowAlert(true);
      }
      setLoading(false);
    },2000);
    })
    .catch(err =>{console.log(err);
    setLoading(false)
  });
};

const handleCloseAlert = () => setShowAlert(false);

  return (
    <div> 
      <Form className='login-form' onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Child's Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Name" name='childName' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='3' maxLength='15' onChange={(e) => setChildName(e.target.value)} required/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)} required/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" name='password' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}' title='Must contain atleast one number and one uppercase and lowercase letter, and atleast 4 or more characters'  onChange={(e) => setPassword(e.target.value)} required/>
    </Form.Group>

    <p> Already have an account ?
    <Link to= '/Login' className='signup-link'> Login </Link> </p>
    
    
    <Button className='signup-login-btn' variant="primary" type="submit" disabled={loading}>
     {loading? <Spinner animation='border' size='md' /> :'Signup'} 
    </Button>
    </Form>

    
    <Modal show={showAlert} onHide={handleCloseAlert}>
        <Modal.Body>
          <p>Account with this email already exists.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseAlert}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Signup
