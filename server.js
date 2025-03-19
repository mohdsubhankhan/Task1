const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Temporary storage for validated data
let submissions = [];

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, password, confirmPassword } = req.body;

    // Server-side validation
    const errors = [];

    if (name.length < 3) {
        errors.push('Name must be at least 3 characters long.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please enter a valid email address.');
    }

    if (age < 18 || age > 100) {
        errors.push('Age must be between 18 and 100.');
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    if (password !== confirmPassword) {
        errors.push('Passwords do not match.');
    }

    // If there are errors, render the form with error messages
    if (errors.length > 0) {
        res.render('index', { errors });
    } else {
        // Store validated data
        submissions.push({ name, email, age });
        res.render('response', { name, email, age });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});