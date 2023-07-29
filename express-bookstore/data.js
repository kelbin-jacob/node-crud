const { v4: uuidv4 } = require('uuid');

const books = [
    {
        id: 1,
        title: 'Book One',
        author: 'Author A',
        created_date:"2023-07-29T11:57:08.266Z",
        updated_date:null
      },
      {
        id: uuidv4(),
        title: 'Book Two',
        author: 'Author B',
        created_date:new Date(),
        updated_date:null
      },

];

module.exports = books;

