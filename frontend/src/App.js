// import React from "react";
// // import styles from "./style";
// import OlaMapsComponent from "./components/OlaMapsComponent";

// function App() {
//  return(
//     // <div className="bg-primary w-full overflow-hidden">
    
//      <>
//       <h1>Ola map</h1>
//       <OlaMapsComponent />
//      </>
//     // </div>
//  )

// }




// export default App;




// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;