import React from 'react'; // Import React to create the component
import ContactList from '../components/ContactList'; // Import the ContactList component to display contacts
import MergeContacts from '../components/MergeContacts'; // Import the MergeContacts component to handle merging of duplicates

// Home component: Serves as the main landing page for the contacts management application
function Home() {
  return (
    <div>
      {/* Render the ContactList component which shows all contacts */}
      <ContactList />
      
      {/* Render the MergeContacts component which allows users to merge duplicate contacts */}
      <MergeContacts />
    </div>
  );
}

// Export the Home component for use in other parts of the application
export default Home;
