import Header from "./Components/Header";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import {Routes, Route} from 'react-router-dom';
import Signup from "./Components/Signup";
import Help from "./Components/Help";
import Cprofile from "./Components/Cprofile";
import Account from "./Components/Account";



function App() {
  return (
    <div>
    
      <Header/>
    
        <Routes>

          <Route path="/" element={<Login/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element ={<Signup/>}/>
          <Route path="/Cprofile" element ={<Cprofile/>}/>
          <Route path="/Account" element ={<Account/>}/>
          <Route path="/Help" element ={<Help/>}/>
          
        </Routes>
      
      <Footer/>
      
    </div>
  );
}

export default App;
