import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = '/contacts';

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setContacts(data);
  };

  const addContact = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phoneNumber }),
    });
    if (response.ok) {
      setName('');
      setPhoneNumber('');
      fetchContacts();
    }
  };

  const updateContact = async () => {
    const response = await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phoneNumber }),
    });
    if (response.ok) {
      setName('');
      setPhoneNumber('');
      setEditingId(null);
      fetchContacts();
    }
  };

  const deleteContact = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  const editContact = (contact) => {
    setName(contact.name);
    setPhoneNumber(contact.phoneNumber);
    setEditingId(contact.id);
  };

  return (
    <div className="App">
      <h1>Contact Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {editingId ? (
          <button onClick={updateContact}>Update</button>
        ) : (
          <button onClick={addContact}>Add</button>
        )}
      </div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phoneNumber}
            <button onClick={() => editContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;