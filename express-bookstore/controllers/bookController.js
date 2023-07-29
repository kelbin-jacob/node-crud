let books = require('../data');
const ERROR_CODES = require('../utils/errorcodes.util')
const ERROR_MESSAGE = require('../utils/errormessages.util')
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

// Controller function to retrieve all books
exports.getAllBooks = (req, res) => {
  return res.status(200).json(books);
};

// Controller function to retrieve a specific book by its ID
exports.getBookById = (req, res) => {
  const bookId = req.params.id;
  const book = books.find((book) => book.id == bookId);
  if (!book) {
    return res.status(400).json({ error: 'Book not found' });
  } else {
    return res.status(200).json(book);
  }
};

// Controller function to add a new book to the collection
exports.addNewBook = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors[0].msg)
  }
  const created_date = new Date()
  const updated_date = new Date()
  const { title, author } = req.body;
  const newBook = { id: uuidv4(), title, author, created_date, updated_date };
  books.push(newBook);
  res.status(201).json(newBook);
};

// Controller function to update an existing book by its ID
exports.updateBookById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors[0].msg)
  }
  const bookId = req.params.id;
  const { title, author } = req.body;
  const updated_date = new Date()
  const bookIndex = books.findIndex((book) => book.id == bookId);
  if (bookIndex == -1) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    const updatedBook = { ...books[bookIndex], title, author, updated_date };
    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
  }
};

exports.deleteBookById = (req, res) => {
  const bookId = req.params.id
  const originalLength = books.length;
  books = books.filter((book) => book.id != bookId);
  if (books.length === originalLength) {
    // If the book with the given ID was not found in the array,
    return res.status(404).json({
      error: ERROR_CODES.BOOK_NOT_FOUND,
      message: ERROR_MESSAGE.BOOK_NOT_FOUND
    });
  } else {
    // If the book was successfully removed, return a 204 status code (No Content).
    return res.status(200).json({
      success: 200,
      message: "deleted successfully"
    });
  }
};