import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import Home from './pages/Home'; // Import the Home page component
import ManageContact from './pages/ManageContact'; // Import the ManageContact component for adding/editing contacts

function App() {
  return (
    // Router component that enables routing within the application
    <Router>
      <div className="container"> {/* Bootstrap container for responsive layout */}
        <Routes>
          {/* Define routes for navigating between different pages */}
          <Route path="/" element={<Home />} /> {/* Root route displays the Home component */}
          <Route path="/contact/:id" element={<ManageContact />} /> {/* Route for editing an existing contact */}
          <Route path="/contact/new" element={<ManageContact />} /> {/* Route for adding a new contact */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
