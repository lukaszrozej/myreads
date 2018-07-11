import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf.js';

const ListBooks = ({books, updateShelf}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <Bookshelf books={books} shelf="currentlyReading" updateShelf={updateShelf} />
      <Bookshelf books={books} shelf="wantToRead" updateShelf={updateShelf} />
      <Bookshelf books={books} shelf="read" updateShelf={updateShelf} />
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>

);

export default ListBooks;