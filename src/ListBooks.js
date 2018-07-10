import React from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

const ListBooks = ({books, update}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <Bookshelf books={books} shelf="currentlyReading" update={update} />
      <Bookshelf books={books} shelf="wantToRead" update={update} />
      <Bookshelf books={books} shelf="read" update={update} />
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>

);

export default ListBooks;