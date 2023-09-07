import React from 'react';
import NavBar from './components/Navbar/NavBar'
import Banner from './components/Banner/Banner'
import Rowpost from './components/RowPost/Rowpost'
import './App.css'
import{popular,originals}from './urls'


function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Rowpost   urls={originals} title='Netflix originals'/>
      <Rowpost  urls={popular}title='Popular Movies' isSmall/>
      
    </div>
  );
}

export default App;
