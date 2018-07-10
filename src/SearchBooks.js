import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  }

  update(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then(() => {
      this.setState({
        books: this.state.books.map(book =>
          book.id === bookToUpdate.id ? Object.assign({}, book, { shelf: shelf })
            : book
        )
      })
    });
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query === prevState.query) return;
    
    if (this.state.query === '') {
      this.setState(() => {
        return { books: [] };
      });
    } else {
      BooksAPI.search(this.state.query)
        .then(books => 
          this.setState(() => {
            return {
              books: Array.isArray(books)
                ? this.putOnShelves(books, this.props.shelvedBooks)
                : []
            }
          })
        )
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.setState({ query: event.target.value })}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.query !== '' ? this.state.books : []}
            update={(book, shelf) => this.update(book, shelf)}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks;
