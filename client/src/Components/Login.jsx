import React, { useState } from 'react';
import {Form,Button, Modal, Spinner}  from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [showAlert, setShowAlert] = useState(false);     // incorrect password
  const [ showAlert1 , setShowAlert1] = useState(false);   // incorrect email

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  
    setLoading(true);

  axios.post('https://crud-main-server.vercel.app/login', { email, password })
  .then(result => {
    console.log(result);

    setTimeout(() => {
    if (result.data.token) {

      // Save the token to localStorage 
      localStorage.setItem('token', result.data.token);

      // Redirect based on the result
      if (result.data.message === 'success account') {
        window.history.replaceState(null, null, '/Account');
        navigate('/Account');
      } else if (result.data.message === 'success profile') {
        window.history.replaceState(null, null, '/Cprofile');
        navigate('/Cprofile');
      }
    } else if (result.data === 'no record found') {
      setShowAlert1(true);
    } else {
      setShowAlert(true);
    }
    setLoading(false);
  },2000);
  })
  .catch(err => {console.log(err);
  setLoading(false);
});
};

const handleCloseAlert = () => setShowAlert(false);
const handleCloseAlert1 = () => setShowAlert1(false);

const getServerResponse = async()=>{

  const res = await axios.get('https://crud-vercel-nine.vercel.app/');

  console.log("Server response ------------------>", res.data);

}

  return (
    <div> 

        <Button onClick={getServerResponse}>Check the server</Button>

      <Form className='login-form' onSubmit={handleSubmit}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)} required/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter Password" name='password' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}' title='Must contain atleast one number, one uppercase and lowercase letter, and atleast 4 or more characters'
      onChange={(e) => setPassword(e.target.value)} required/>
    </Form.Group>

    <p> Don't you have an account yet ?
    <Link to= '/Signup' className='signup-link'> Signup </Link> </p>
    
    <Button className='signup-login-btn' variant="primary" type="submit" disabled={loading}>
      {loading? <Spinner animation='border' size='md'/>: ' Login '}
     
    </Button>
    </Form>
    
    <Modal show={showAlert} onHide={handleCloseAlert}>
      <Modal.Body>
       <p>Incorrect Password, try again.</p>
      </Modal.Body>
    <Modal.Footer>
     <Button variant='primary' onClick={handleCloseAlert}>
        Close
     </Button>
    </Modal.Footer>
    </Modal>

    <Modal show={showAlert1} onHide={handleCloseAlert1}>
      <Modal.Body>
       <p>Account with this email is not exist.</p>
      </Modal.Body>
    <Modal.Footer>
     <Button variant='primary' onClick={handleCloseAlert1}>
        Close
     </Button>
    </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Login
