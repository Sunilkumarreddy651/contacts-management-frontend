import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM for rendering the root component
import './index.css'; // Importing custom CSS for global styles
import App from './App'; // Main application component that includes all routing
import reportWebVitals from './reportWebVitals'; // Importing the reportWebVitals for performance tracking

// Creating the root DOM node for React to render the application into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main App component within React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App /> {/* App component which includes the entire app’s routing and main structure */}
  </React.StrictMode>
);

// Optionally, tracking app performance using reportWebVitals
reportWebVitals();
