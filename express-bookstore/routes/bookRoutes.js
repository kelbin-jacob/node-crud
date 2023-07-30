
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const bookValidator = require('../validators/book.validator')


// Route to retrieve all books
router.get('/books', bookController.getAllBooks);

// Route to retrieve a specific book by its ID
router.get('/books/:id', bookController.getBookById);

// Route to add a new book to the collection
router.post('/books', bookValidator.bookValidator(), bookController.addNewBook);

// Route to update an existing book by its ID
router.put('/books/:id', bookValidator.bookValidator(), bookController.updateBookById);

// Route to delete a book by its ID
router.delete('/books/:id', bookController.deleteBookById);


module.exports = router;
