import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
      const response = await axios.post(
        'http://127.0.0.1:8000/api/books/',
        { title, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Book added successfully:', response.data);
      // Optionally, clear the form fields after successful submission
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Book Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;