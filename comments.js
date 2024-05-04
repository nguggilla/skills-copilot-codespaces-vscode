// Create web server to handle comments

// Import express module
const express = require('express');

// Create express application
const app = express();

// Import body-parser module
const bodyParser = require('body-parser');

// Import fs module
const fs = require('fs');

// Use body-parser to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Use body-parser to parse application/json
app.use(bodyParser.json());

// Set port to 3000
const port = 3000;

// Load comments from comments.json
let comments = JSON.parse(fs.readFileSync('comments.json'));

// Handle GET request to /comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// Handle POST request to /comments
app.post('/comments', (req, res) => {
    // Create new comment
    let comment = {
        id: comments.length + 1, // Increment id
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };

    // Add comment to comments
    comments.push(comment);

    // Write comments to comments.json
    fs.writeFileSync('comments.json', JSON.stringify(comments));

    res.send(comment);
}
