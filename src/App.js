import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  update(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then(() => {
      this.setState({
        books: this.state.books.map(book => 
          book.id === bookToUpdate.id ? Object.assign({}, book, {shelf: shelf})
                                      : book
        )
      })
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            update={(book, shelf) => this.update(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
