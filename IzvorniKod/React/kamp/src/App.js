import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import './App.css'



function App() {
  return (
    <div className="App">
      <Header />
      <div className="everything">
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default App;
