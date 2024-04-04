import React from 'react';
import { useState } from 'react';
import { logout } from './Logout';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { Image, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {

  const [logoutLoading, setLogoutLoading ] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();


  return (
    <div className='header'>

      <Navbar bg="primary" data-bs-theme="dark">
    
        <Image src="https://cdn3.iconfinder.com/data/icons/insurance-68/66/1-512.png" alt="logo" className='logo-img'/>
          <Navbar.Brand as={Link} to ="/">DaycareEase</Navbar.Brand>
          <Nav className="me-auto">
          
            <Nav.Link as={Link} to ="/Signup">Signup</Nav.Link>

            <Nav.Link as={Link} to ="/Help">Help</Nav.Link>
            
            <img src='https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-1024.png'
             className='logout-logo'
             alt='logoutLogo'
             onClick={() => {
              setPageLoading(true);
              setTimeout(() => {

               setLogoutLoading(true);
               setTimeout(() => {
                logout(navigate);
                setLogoutLoading(false);
                setPageLoading(false); // Reset page loading state
              }, 2000);
            }, 2000);
          }}
             style={{ cursor: 'pointer' }}
             disabled={logoutLoading || pageLoading}
            />

          </Nav>

      </Navbar>

      {pageLoading && (
        <div className='spinner-overlay'>
          <Spinner animation='border' size='md' role='status'>
          </Spinner>
        </div>
  )}
    </div>
    
  )
}

export default Header