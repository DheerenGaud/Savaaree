import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "./index.css"
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import reportWebVitals from "./reportWebVitals";

const clientId="698178007536-2r1ob4k3ivstdicobae7q38h88s4h859.apps.googleusercontent.com"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      
      <App />
    </Provider>
  </GoogleOAuthProvider>
    // <h1>nfkd</h1>
  // </React.StrictMode>
);



// reportWebVitals();
