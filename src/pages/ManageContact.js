import React from 'react'; // Import React to create the component
import ContactForm from '../components/ContactForm'; // Import the ContactForm component to manage contact information

// ManageContact component: Handles both adding a new contact and editing an existing one
function ManageContact() {
  return (
    <div>
      {/* Conditional rendering for the header based on the URL path */}
      <h2>{window.location.pathname.includes('new') ? 'Add New Contact' : 'Edit Contact'}</h2>
      {/* Render the ContactForm component which handles form inputs for contact details */}
      <ContactForm />
    </div>
  );
}

// Export the ManageContact component for use in routing or other parts of the application
export default ManageContact;
