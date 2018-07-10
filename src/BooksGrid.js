import React from 'react';
import Book from './Book.js'

const BooksGrid = ({books, update}) => (
  <ol className="books-grid">
    {books
      .map(book => (<li key={book.id}><Book book={book} update={update} /></li>))
    }
  </ol>
)

export default BooksGrid;