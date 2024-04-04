import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal ,Button, Spinner, Form } from 'react-bootstrap';


function Account() {

  const initialProfileData = {
    childname: '',
    dob: '',
    gender: '',
    guardianName: '',
    relationship: '',
    emergencyContactInfo: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    pickupPersonName: '',
    pickupPersonContactInfo: '',
    medicalConsent: '',
  };

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState(initialProfileData);
  const [originalProfileData, setOriginalProfileData] = useState(initialProfileData);
  const [editMode , setEditMode] = useState(false);

  const [deleteLoading , setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  
  

  // FETCH AND DISPLAY PROFILE DATA

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Token not present, show a message and redirect
          alert('Please login first');
          navigate('/login');
          return;
        }

    const response = await axios.get('https://crud-main-server.vercel.app/getProfileData', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProfileData(response.data);
    setOriginalProfileData(response.data);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};

fetchData();
}, [navigate]);


//EDIT AND UPDATE PROFILE DATA

const handleUpdateProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Token not present, show a message and redirect
      alert('Please login first');
      navigate('/login');
      return;
    }

    setSaveLoading(true);

    await axios.put('https://crud-main-server.vercel.app/updateProfileData', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOriginalProfileData(profileData);
     setEditMode(false);
  } catch (error) {
    console.error('Error updating profile data:', error);
  } finally {
    setSaveLoading(false);
  }
};
   

//CANCEL EDIT AND UPDATE PROFILE DATA

const handleCancelEdit =() => {

  setProfileData(originalProfileData);
  setEditMode(false);
}


// DELETE PROFILE DATA

const confirmDeleteProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {

      alert('Please login first');
      navigate('/login');
      return;
    }

    setDeleteLoading(true);

    const response = await axios.delete('https://crud-main-server.vercel.app/deleteProfileData', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { childname: profileData.childname },
    });

    console.log('Profile deleted successfully:', response);
    if (response.data.deleted) {
      window.history.replaceState(null, null, '/Cprofile');
      navigate('/Cprofile');
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
  } finally {
      setDeleteLoading(false);
      setShowModal(false);
    
  }
};

const handleDeleteProfile = () => {
setShowModal(true);
}

  return (
    <div className='container mt-4 mb-4'>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <p>Are you sure you want to delete your profile?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProfile} disabled={deleteLoading}>
            {deleteLoading ? <Spinner animation="border" size="sm" /> : 'Delete Profile'}
          </Button>
        </Modal.Footer>
      </Modal>

       <br />
      
       <h1 className='profile-heading text-light'> Profile </h1>
      <br />
    
     {editMode ? (
        <div className="edit-mode">
          

           <Form.Group className='d-flex flex-wrap'>
             <Form.Label>Guardian's Name </Form.Label>

             <Form.Control className='input-box-edit-mode'type="text" pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='3' maxLength='15' value={profileData.guardianName} onChange={(e) => setProfileData({ ...profileData, guardianName: e.target.value })}/>

           </Form.Group> 

           <br />
          
          <Form.Group className='d-flex flex-wrap'>
            <Form.Label> Relationship</Form.Label>

             <Form.Check type="radio" label='Father' className='radio-btn-edit-mode' name='relationship' value={'Father'} onChange={(e) => setProfileData ({ ...profileData, relationship: e.target.value })}/>

             <Form.Check type="radio" label='Mother' className='radio-btn-edit-mode' name='relationship' value={'Mother'} onChange={(e) => setProfileData ({ ...profileData, relationship: e.target.value })}/>

             <Form.Check type="radio" label='Legal Guardian' className='radio-btn-edit-mode' name='relationship' value={'Legal Guardian'} onChange={(e) => setProfileData ({ ...profileData, relationship: e.target.value })}/>

          </Form.Group>
          <br />
        
          <Form.Group className='d-flex flex-wrap'>
            <Form.Label>Emergency Contact </Form.Label>

            <Form.Control className='input-box-edit-mode' type="tel" pattern="[0-9]{10}" value={profileData.emergencyContactInfo} onChange={(e) => setProfileData({ ...profileData, emergencyContactInfo: e.target.value })}/>

          </Form.Group>
          <br />
          
          <Form.Group className='d-flex flex-wrap'>
            <Form.Label>Address</Form.Label>

             <Form.Control type="text" className='input-box-edit-mode' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='5' maxLength='20' value={profileData.addressLine1} onChange={(e) => setProfileData({ ...profileData, addressLine1: e.target.value })}/>

             <Form.Control type="text" className='input-box-edit-mode' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='5' maxLength='20' value={profileData.addressLine2} onChange={(e) => setProfileData({ ...profileData, addressLine2: e.target.value })}/>

             <Form.Control type="text" className='input-box-edit-mode' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='5' maxLength='20' value={profileData.addressLine3} onChange={(e) => setProfileData({ ...profileData, addressLine3: e.target.value })}/>

          </Form.Group>
          <br />

          <Form.Group  className='d-flex flex-wrap'>
            <Form.Label>Authorized Pickup Person</Form.Label>

            <Form.Control type="text" className='input-box-edit-mode' pattern='^[A-Za-z ]+$' title='Use uppercase or lowercase letters only' minLength='3' maxLength='15' value={profileData.pickupPersonName} onChange={(e) => setProfileData({ ...profileData, pickupPersonName: e.target.value })}/>

            <Form.Control type="tel" className='input-box-edit-mode' value={profileData.pickupPersonContactInfo} onChange={(e) => setProfileData({ ...profileData, pickupPersonContactInfo: e.target.value })}/>

          </Form.Group>
          <br />

          <Form.Group>
            <Button className='save-btn bg-primary' onClick={handleUpdateProfile}>
              {saveLoading ? <Spinner animation='border' size='sm'/> : 'Save'}
            </Button>

            <Button className='cancel-btn bg-warning' onClick={handleCancelEdit}>Cancel</Button>

          </Form.Group>
          <br />
          
        </div>
      ) : (
      
        <div className="profile-info">

          {/* DISPLAY PROFILE INFORMATION */}
        
          <div className="basic-info">
            <p><strong>Child's Name:</strong> {profileData.childname}</p>
            <p><strong>Date of Birth:</strong> {profileData.dob}</p>
            <p><strong>Guardian's Name:</strong> {profileData.guardianName}</p>
            <p><strong>Relationship:</strong> {profileData.relationship}</p>
          </div>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Emergency Contact:</strong> {profileData.emergencyContactInfo}</p>
            <p><strong>Address:</strong><br/>{profileData.addressLine1}<br/>{profileData.addressLine2}<br/>{profileData.addressLine3}</p>
          </div>

          <div className="pickup-person">
            <h3>Authorized Pickup Person</h3>
            <p><strong>Name:</strong> {profileData.pickupPersonName}</p>
            <p><strong>Contact Information:</strong> {profileData.pickupPersonContactInfo}</p>
          </div>
        </div>
        
      )}

          {/* BUTTON FOR EDIT AND DELETE */}
          
          {!editMode && (
      <Form.Group>
        <Button className='edt-btn bg-primary' onClick={() => setEditMode(true)}>Edit</Button>
        <Button className='dlt-btn bg-danger' onClick={handleDeleteProfile}>Delete</Button>
      </Form.Group>
    )}

    </div>
            
  );
}

export default Account;
