const {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBookById,
    deleteBookById,
} = require('../controllers/bookController');
const { books } = require('../test/data.test');

const { validationResult } = require('express-validator');
jest.mock('express-validator');

describe('Book Controller Test', () => {
    // Mocking the response object for testing
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('get all books', () => {
        // Test for getAllBooks controller function
        it('should return all books', () => {
            const req = {};
            getAllBooks(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    })
    describe('get book by id', () => {
        // Test for getBookById controller function (positive case)
        it('should return a specific book by its ID', async () => {
            const req = { params: { id: 1 } }; // Replace '1' with a valid book ID from your data

            getBookById(req, res);
            // Check if the status and json methods were called with the correct arguments
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(books[0]); // Assuming the book with ID '1' exists in the data
        });

        // Test for getBookById controller function (negative case)
        it('should return an error when book is not found', () => {
            const bookId = "76957425-3672-4cd8-bce5-37cacbd2abww"; // Replace with an ID that doesn't exist in the data
            const req = { params: { id: bookId } };
            getBookById(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Book not found' });
        });
    })
    describe('add book', () => {
        // Test for addNewBook controller function
        it('should add a new book to the collection', () => {
            const req = {
                body: {
                    title: 'New Book Title',
                    author: 'New Book Author',
                },
            };
            // Mock the validationResult to return an empty array (no errors)
            validationResult.mockReturnValueOnce({ isEmpty: () => true });

            addNewBook(req, res);
            // Check if the status and json methods were called with the correct arguments
            expect(res.status).toHaveBeenCalledWith(201);

        });

        it('should return validation errors when request body is invalid', () => {
            const req = {
                body: {
                    // Missing title and author, which will trigger validation errors
                },
            };

            // Mock the validationResult to return validation errors
            validationResult.mockReturnValueOnce({
                isEmpty: () => false,
                errors: [{ msg: 'Title is required' }, { msg: 'Author is required' }],
            });

            addNewBook(req, res);

            // Check if the status and json methods were called with the correct arguments
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Title is required'); // Assuming the validation error messages are returned as expected
        });
    });
    describe('update book', () => {
        // Test for updateBookById controller function (positive case)
        it('should update an existing book by its ID', () => {
            const bookId = 1; // Replace with an actual valid book ID
            const req = {
                params: { id: bookId },
                body: {
                    title: 'Updated Book Title',
                    author: 'Updated Book Author',
                },
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => true });
            updateBookById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        // Test for updateBookById controller function (negative case)
        it('should return an error when book is not found for update', () => {
            const bookId = '76957425-3672-4cd8-bce5-37cacbd2abc3'; // Replace with an ID that doesn't exist in the data
            const req = {
                params: { id: bookId }, body: {
                    title: 'Updated Book Title',
                    author: 'Updated Book Author',
                },
            };
            validationResult.mockReturnValueOnce({ isEmpty: () => true });
            updateBookById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Book not found',
            });
        });
    })
    describe('delete book', () => {
        // Test for deleteBookById controller function
        it('should delete a book by its ID', () => {
            const bookId = 1; // Replace 'valid_id' with a valid book ID from your data
            const req = { params: { id: bookId } };
            deleteBookById(req, res);

            // Check if the status and json methods were called with the correct arguments
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: 200,
                message: 'deleted successfully',
            });
        });

        it('should return error when book is not found', () => {
            const bookId = '44cad60f-0b0f-4e9b-987e-ab46c9cd4312'; // Replace 'non_existent_id' with an ID that doesn't exist in the data
            const req = { params: { id: bookId } };
            deleteBookById(req, res);

            // Check if the status and json methods were called with the correct arguments
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: 404,
                message: 'Book not found',
            });

        });
    });
})
