// src/services/ContactService.js
import axios from 'axios'; // Import axios for making HTTP requests to the backend API

// Initialize an axios instance with a base URL pointing to the backend server's API endpoint
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Fetch all contacts from the backend API
export const fetchContacts = () => API.get('/contacts');

// Fetch a single contact by its ID from the backend API
export const fetchContact = (id) => API.get(`/contacts/${id}`);

// Create a new contact by sending the contact data to the backend API
export const createContact = (contact) => API.post('/contacts', contact);

// Update an existing contact by its ID, sending updated data to the backend API
export const updateContact = (id, contact) => API.put(`/contacts/${id}`, contact);

// Delete a contact by its ID from the backend API
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

// Merge duplicate contacts based on given criteria; sends data to initiate merge process in the backend
export const mergeContacts = (data) => API.post('/contacts/merge', data);
