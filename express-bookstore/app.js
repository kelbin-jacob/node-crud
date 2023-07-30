
const express = require('express');
const app = express();
const port = 3000; 
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors'); // Import the cors package



app.use(express.json());

//This code sets up Cross-Origin Resource Sharing (CORS) configuration for the application.
app.use(cors({ credentials: true, origin: '*' }));

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/book', bookRoutes)


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
