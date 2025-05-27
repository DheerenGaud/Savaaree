import React, { useState } from 'react';
import Welcomepage from './Credentials/Welcomepage';
import License from './Credentials/License';
import Adhar from './Credentials/Adhar';
import RC from './Credentials/RC';
import Profile from './Credentials/Profile';

function Documents() {
  const [page, setPage] = useState("welcome");

  const renderPage = () => {
    switch (page) {
      case "welcome":
        return <Welcomepage setPage={setPage} />;
      case "License":
        return <License setPage={setPage}/>;
      case "Adhar":
        return <Adhar setPage={setPage}/>;
      case "RC":
        return <RC  setPage={setPage}/>;
      case "Profile":
        return <Profile  setPage={setPage}/>;
      default:
        return <Welcomepage setPage={setPage} />;
    }
  };

  return (
    <div className='text-white'>
      {renderPage()}
    </div>
  );
}

export default Documents;
