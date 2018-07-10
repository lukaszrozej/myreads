import React from 'react';
import Book from './Book.js'

const Bookshelf = ({books, shelf, update}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{
      shelf
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase() )
        // inspired by https://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
    }</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books
          .filter(book => book.shelf === shelf)
          .map(book => (<li key={book.id}><Book book={book} update={update}/></li>))
        }
      </ol>
    </div>
  </div>

);

export default Bookshelf;
