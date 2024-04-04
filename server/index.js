const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const port = 5000;
const RegisterModel = require('./models/Register');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const ProfileModel = require ('./models/Profile');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors(
  {
    origin: 'https://crud-vercel-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }
));

app.use(express.json())

mongoose.connect(process.env.DB_URI);
// mongoose.connect('mongodb+srv://ameenaharis7:access.database@cluster0.n1djxlp.mongodb.net/CRUD?retryWrites=true&w=majority') // CRUD => database name 


// profile => collection name
app.post('/profile',(req,res)=>{
  const {childname, dob, gender, guardianName,relationship,emergencyContactInfo, addressLine1, addressLine2,addressLine3,pickupPersonName, pickupPersonContactInfo,joiningFrom, joiningTo,medicalConsent} = req.body;

  ProfileModel.create({
    childname: childname,
    dob: dob,
    gender: gender,
    guardianName: guardianName,
    relationship: relationship,
    emergencyContactInfo: emergencyContactInfo,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    addressLine3: addressLine3,
    pickupPersonName: pickupPersonName,
    pickupPersonContactInfo: pickupPersonContactInfo,
    joiningFrom: joiningFrom,
    joiningTo: joiningTo,
    medicalConsent: medicalConsent
    
  })
    .then((result) => res.json('profile created'))
    .catch((err) => res.json(err));

})

app.get('/getProfileData', (req, res) => {
  // Retrieve the profile data from the database
  
  ProfileModel.findOne({  })
    .then((profile) => {
      if (profile) {
        res.json(profile);
      } else {
        res.json({}); // Send an empty object if no profile is found
      }
    })
    .catch((err) => {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.put('/updateProfileData', (req, res) => {
  const updatedData = req.body;

  // Adjust the condition based on database structure
  ProfileModel.findOneAndUpdate({ childname: updatedData.childname }, updatedData, { new: true })
    .then((updatedProfile) => {
      if (updatedProfile) {
        res.json(updatedProfile);
      } else {
        res.json({}); // Send an empty object if no profile is found or not updated
      }
    })
    .catch((err) => {
      console.error('Error updating profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.delete('/deleteProfileData', (req, res) => {
  const { childname } = req.body;

  // Adjust the condition based on database structure
  ProfileModel.findOneAndDelete({ childname: childname  })
    .then((deletedProfile) => {
      if (deletedProfile) {
        res.json({ deleted: true });
      } else {
        res.json({ deleted: false });
      }
    })
    .catch((err) => {
      console.error('Error deleting profile:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  RegisterModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {

            const token = jwt.sign({email: user.email}, 'jwtkeycrud', {expiresIn:'1h'});

            // Check if the user has a profile
            ProfileModel.findOne({ childname: user.childName })
              .then(profile => {
                if (profile) {

                  res.json({token, message:'success account'}); // Redirect to 'Account' page
                } else {

                  res.json({token , message:'success profile'}); // Redirect to 'Cprofile' page
                }
              })
              .catch(err => res.json(err));
          } else {
            res.json('incorrect password');
          }
        });
      } else {
        res.json('no record found');
      }
    })
    .catch(err => res.json(err));
});

// register => collection name
app.post('/register', (req, res) => {
  const { childName, email, password } = req.body;

  RegisterModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json('Already have an account');
      } else {

        // Hash the password
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) {
            res.json(err);
          } else {
            RegisterModel.create({
              childName: childName,
              email: email,
              password: hashedPassword, // Save the hashed password
            })
              .then((result) => res.json('Account created'))
              .catch((err) => res.json(err));
          }
        });
      }
    })
    .catch((err) => res.json(err));
});


app.get("/", (req,res)=>{

  res.send("Root route is working!!!!!!!!!!");

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
