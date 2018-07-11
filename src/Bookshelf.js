import React from 'react';
import BooksGrid from './BooksGrid.js';

const Bookshelf = ({books, shelf, updateShelf}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{
      shelf
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase() )
        // inspired by https://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
    }</h2>
    <div className="bookshelf-books">
      <BooksGrid
        books={books.filter(book => book.shelf === shelf)}
        updateShelf={updateShelf}
      />
    </div>
  </div>

);

export default Bookshelf;
