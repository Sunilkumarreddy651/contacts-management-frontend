// src/components/ContactForm.js
import React, { useState, useEffect } from 'react';
import { createContact, fetchContact, updateContact } from '../services/ContactService';
import { useNavigate, useParams } from 'react-router-dom';

function ContactForm() {
  const { id } = useParams(); // Get the contact ID from the URL parameters
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Fetch contact details if editing an existing contact
  useEffect(() => {
    if (id) {
      async function getContact() {
        const response = await fetchContact(id); // Fetch the contact by ID
        setContact(response.data); // Set the fetched contact details to state
      }
      getContact(); // Call the function to get the contact
    }
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value }); // Update state with input field values
  };

  // Validate names to only allow alphabetic characters and spaces
  const isValidName = (name) => {
    return /^[A-Za-z\s]+$/.test(name); // Regular expression to allow alphabetic characters and spaces
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate first name
    if (!isValidName(contact.firstName)) {
      alert('First Name can only contain alphabetic characters and spaces.');
      return;
    }

    // Validate last name
    if (!isValidName(contact.lastName)) {
      alert('Last Name can only contain alphabetic characters and spaces.');
      return;
    }

    // Validate phone number length
    if (contact.phone.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    // Submit the form data
    if (id) {
      await updateContact(id, contact); // Update existing contact
    } else {
      await createContact(contact); // Create a new contact
    }
    navigate('/'); // Redirect to the home page after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>First Name</label>
        <input
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          required
          className="form-control"
          maxLength={10}
        />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <input
          name="address"
          value={contact.address}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-success">Save</button>
    </form>
  );
}

export default ContactForm;
