import React, { useEffect, useState } from 'react'; // Import React and hooks for state and lifecycle
import { fetchContacts, mergeContacts } from '../services/ContactService'; // Import functions to fetch and merge contacts

function MergeContacts() {
    // State to hold duplicate contacts and selected duplicates for merging
    const [duplicates, setDuplicates] = useState([]);
    const [selectedDuplicates, setSelectedDuplicates] = useState([]);

    // Effect to fetch contacts and find duplicates when the component mounts
    useEffect(() => {
        const getContacts = async () => {
            // Fetch contacts from the API
            const response = await fetchContacts();
            // Identify duplicates from the fetched contacts
            findDuplicates(response.data);
        };
        getContacts(); // Call the function to fetch contacts
    }, []); // Empty dependency array ensures this runs once on mount

    // Function to find duplicate contacts based on email or phone number
    const findDuplicates = (contacts) => {
        const emailMap = {}; // Object to map emails to contacts
        const phoneMap = {}; // Object to map phone numbers to contacts

        // Iterate through contacts to populate email and phone maps
        contacts.forEach(contact => {
            if (contact.email) {
                emailMap[contact.email] = emailMap[contact.email] || [];
                emailMap[contact.email].push(contact); // Group contacts by email
            }

            if (contact.phone) {
                phoneMap[contact.phone] = phoneMap[contact.phone] || [];
                phoneMap[contact.phone].push(contact); // Group contacts by phone number
            }
        });

        const foundDuplicates = []; // Array to hold found duplicate contacts

        // Check for duplicates in the email map
        for (const key in emailMap) {
            if (emailMap[key].length > 1) foundDuplicates.push(...emailMap[key]);
        }

        // Check for duplicates in the phone map
        for (const key in phoneMap) {
            if (phoneMap[key].length > 1) foundDuplicates.push(...phoneMap[key]);
        }

        // Remove duplicate contacts from the foundDuplicates array
        setDuplicates([...new Set(foundDuplicates)]);
    };

    // Function to handle the merging of selected duplicate contacts
    const handleMerge = async () => {
        if (selectedDuplicates.length > 0) {
            // Call the mergeContacts function with the selected duplicates
            await mergeContacts({ duplicates: selectedDuplicates });
            // Refresh duplicates after merging
            const updatedContacts = await fetchContacts().then(res => res.data);
            findDuplicates(updatedContacts);
            // Clear selected duplicates after merge
            setSelectedDuplicates([]);
        }
    };

    // Function to handle selection of duplicates
    const handleSelect = (id) => {
        // Update the selectedDuplicates state
        setSelectedDuplicates(prev =>
            prev.includes(id) // If already selected, deselect it
                ? prev.filter(selectedId => selectedId !== id)
                : [...prev, id] // Otherwise, add to the selection
        );
    };

    return (
        <div>
            <h2>Merge Contacts</h2>
            {/* Button to trigger merge action, disabled if no duplicates are selected */}
            <button onClick={handleMerge} className="btn btn-warning" disabled={selectedDuplicates.length === 0}>
                Merge Selected Duplicates
            </button>
            <h3>Duplicates</h3>
            <ul>
                {/* Render list of duplicate contacts */}
                {duplicates.map(contact => (
                    <li key={contact._id}>
                        {/* Checkbox for selecting duplicates */}
                        <input 
                            type="checkbox" 
                            onChange={() => handleSelect(contact._id)} 
                            checked={selectedDuplicates.includes(contact._id)} 
                        />
                        {/* Display contact information */}
                        {contact.firstName} {contact.lastName} - {contact.email} - {contact.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MergeContacts; // Export the component for use in other parts of the application
