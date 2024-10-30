import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { fetchContacts, deleteContact } from '../services/ContactService'; // Import API service functions for fetching and deleting contacts
import { Link } from 'react-router-dom'; // Import Link for navigation between routes

function ContactList() {
  // State to hold the list of contacts
  const [contacts, setContacts] = useState([]);

  // Fetch contacts when the component mounts
  useEffect(() => {
    async function getContacts() {
      const response = await fetchContacts(); // Call the API to fetch contacts
      setContacts(response.data); // Update the state with the list of contacts
    }
    getContacts(); // Execute the function to fetch contacts
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Handle contact deletion
  const handleDelete = async (id) => {
    await deleteContact(id); // Call the API to delete the contact
    setContacts(contacts.filter(contact => contact._id !== id)); // Update the state to remove the deleted contact from the list
  };

  return (
    <div>
      <h2>Contacts</h2>
      <Link to="/contact/new" className="btn btn-primary mb-3">Add New Contact</Link> {/* Link to navigate to the contact form for adding a new contact */}
      
      <table className="table table-bordered"> {/* Display contacts in a table format */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => ( // Iterate over the contacts and create a table row for each
            <tr key={contact._id}> {/* Use contact ID as the key for each row */}
              <td>{contact.firstName} {contact.lastName}</td> {/* Display full name */}
              <td>{contact.email}</td> {/* Display email address */}
              <td>{contact.phone}</td> {/* Display phone number */}
              <td>{contact.address || "N/A"}</td> {/* Display address or "N/A" if not provided */}
              <td>
                <Link to={`/contact/${contact._id}`} className="btn btn-info btn-sm me-2">Edit</Link> {/* Link to edit the specific contact */}
                <button onClick={() => handleDelete(contact._id)} className="btn btn-danger btn-sm">Delete</button> {/* Button to delete the contact */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList; // Export the component for use in other parts of the application
