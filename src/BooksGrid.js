import React from 'react';
import Book from './Book.js'

const BooksGrid = ({books, updateShelf}) => (
  <ol className="books-grid">
    {books
      .map(book => (<li key={book.id}><Book book={book} updateShelf={updateShelf} /></li>))
    }
  </ol>
)

export default BooksGrid;