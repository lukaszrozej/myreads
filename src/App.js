import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    foundBooks: [],
    query: '',
  }

  putOnShelves(foundBooks, shelvedBooks) {
    const putOnShelf = book =>
      Object.assign(
        {},
        book,
        { shelf: shelvedBooks.find(shelvedBook => shelvedBook.id === book.id) || '' }
      )
    return foundBooks.map(putOnShelf)
  }


  updateShelf(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then(() => {
      this.setState({
        shelvedBooks: this.state.shelvedBooks
                      .filter(book => book.id !== bookToUpdate.id)
                      .concat(Object.assign({}, bookToUpdate, {shelf: shelf})),
        foundBooks: this.state.foundBooks
                    .map(book => book.id === bookToUpdate.id
                                ? Object.assign({}, book, { shelf: shelf })
                                : book
                    )
      })
    });
  }

  updateQuery(query) {
    const putOnShelf = book =>
      Object.assign(
        {},
        book,
        this.state.shelvedBooks.find(shelvedBook => shelvedBook.id === book.id)
      )
    this.setState(
      { query },
      () => {
        if (query === '') return;
        BooksAPI.search(query).then(response =>
          this.setState({
            foundBooks: response.error ? [] : response.map(putOnShelf)
          })
        )
      }
    )
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ shelvedBooks: books }));
  }

  // // Necessary to make sure all books are displayed
  // // after coming back from search page
  // componentDidUpdate(prevProps, prevState){
  //   if (prevState === this.state) return;
  //   console.log('app update')
  //   BooksAPI.getAll().then(books => this.setState({ books }));
  // }

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
    )
  }
}

export default BooksApp
