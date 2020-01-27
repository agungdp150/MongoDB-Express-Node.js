const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

app.use(bodyParser.json());

Genre             = require('./models/genre');
Book              = require('./models/book');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// For Get Genres

app.get('/api/genres', function(req, res){
  Genre.getGenres(function(err, genres) {
    if(err) {
      throw err;
    }
    res.json(genres);
  });
});

// Add genre posts
app.post('/api/genres', function(req, res){
  const genre = req.body;
  Genre.addGenres(genre, function(err, genre) {
    if(err) {
      throw err;
    }
    res.json(genre);
  });
});


// Update Genre
app.put('/api/genres/:_id', function(req, res) {
  const id    = req.params._id;
  const genre = req.body;
  Genre.updateGenre(id, genre, function(err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});


// Delete Genre
app.delete('/api/genres/:_id', function(req, res) {
  const id  = req.params._id;
  Genre.deleteGenre(id, function(err, genre) {
    if (err) {
      throw err;
    } 
    res.json(genre);
  })
})

// For Get Book
app.get('/api/books', function(req, res){
  Book.getBook(function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});

// For Get books by ID
app.get('/api/books/:_id', function(req, res){
  Book.getBookById(req.params._id, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});


// Add Book
app.post('/api/books', function(req, res){
  const book = req.body;
  Book.addBook(book, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});


// Update Books
app.put('/api/books/:_id', function(req, res){
  const id    = req.params._id;
  const book  = req.body;
  Book.updateBook(id, book, {}, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000);
console.log('running on port 3000');



