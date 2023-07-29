
const express = require('express');
const app = express();
const port = 3000; 
const bodyParser = require('body-parser');


const bookRoutes = require('./routes/bookRoutes');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bookRoutes);
app.use('/book', bookRoutes)


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
