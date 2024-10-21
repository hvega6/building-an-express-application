const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Middleware setup
app.use(morgan('dev')); // Logging middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Custom middleware for request timing
app.use((req, res, next) => {
    req.requestTime = new Date().toLocaleTimeString();
    console.log(`Request received at: ${req.requestTime}`);
    next();
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        requestTime: req.requestTime
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        requestTime: req.requestTime
    });
});

// Route with parameter
app.get('/user/:name', (req, res) => {
    res.render('user', {
        title: 'User Profile',
        username: req.params.name,
        requestTime: req.requestTime
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    console.log('Form data received:', req.body);
    res.send('Form submitted successfully!');
});

// Download route with proper Content-Disposition header
app.get('/download', (req, res) => {
    const filePath = 'public/images/a.jpg';
    const options = {
      root: __dirname,
      dotfiles: 'deny',
      headers: {
        'Content-Disposition': 'attachment; filename="a.jpg"'
      }
    };
  
    res.sendFile(filePath, options);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} you better go catch it!`);
});