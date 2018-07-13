import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks.js';
import ListBooks from './ListBooks.js';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    foundBooks: [],
    query: '',
  }

  updateShelf(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then(() => {

      // Added because of requirement in the review
      bookToUpdate.shelf = shelf;
      this.setState(state => ({
        shelvedBooks: state.shelvedBooks
                      .filter(book => book.id !== bookToUpdate.id)
                      // Changed because of requirement in the review
                      .concat(bookToUpdate),
                      // Below is the previous version which didn't cause any bugs
                      // on my machine
                      // (Chrome 66.0.3359.170 or Firefox 61.0.1 on Ubuntu 16.04.3 LTS)
                      // .concat(Object.assign({}, bookToUpdate, { shelf: shelf })),

        // According to the reviewer this update is unnecessary
        // And his right, but I don't understand why
        // If I change shelf of a book on the search page
        // React devtools show it's shelf changing in the foundBooks array
        // How come? foundBooks array is not updated!
        // foundBooks: state.foundBooks
        //             .map(book => book.id === bookToUpdate.id
        //                         ? Object.assign({}, book, { shelf: shelf })
        //                         : book
        //             )
      }))
    });
  }

  searchForBooks() {
    console.log('search')
    const query = this.state.query.trim();
    if (query === '') {
      this.setState({ foundBooks: [] });
      return;
    }

    const putOnShelf = book =>
      Object.assign(
        {},
        book,
        this.state.shelvedBooks.find(shelvedBook => shelvedBook.id === book.id)
      );

    BooksAPI.search(query).then(response =>
      this.setState({
        // Checking if query is empty is necessary
        // Otherwise response might arrive after search input is cleared
        // and results will be displayed although they shouldn't
        foundBooks: response.error || this.state.query.trim() === ''
                    ? []
                    : response.map(putOnShelf)
      })
    );
  }

  updateQuery(query) {
    this.setState(
      { query },
      () => { this.searchForBooks() }
      // It also worked without wrapping in arrow function
      // just passing this.searchForBooks as second parameter
      // How does it bind 'this' to searchForBooks ?
    );
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ shelvedBooks: books }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            shelvedBooks={this.state.shelvedBooks}
            foundBooks={this.state.foundBooks}
            query={this.state.query}
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            updateQuery={(query) => this.updateQuery(query)}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.shelvedBooks}
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
