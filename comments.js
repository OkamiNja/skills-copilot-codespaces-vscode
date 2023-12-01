// Create web server using express
// Create a web server using express
const express = require('express');
const app = express();
const port = 3000;

// Import comments from comments.json
const comments = require('./comments.json');

// Import body-parser
const bodyParser = require('body-parser');

// Tell express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Tell express to use body-parser
app.use(bodyParser.json());

// Create GET /comments route that returns all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Create GET /comments/:id route that returns a single comment
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: `Comment ${req.params.id} does not exist` });
    }
});

// Create POST /comments route that adds a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.json(comment);
});

// Create PUT /comments/:id route that updates a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (comment) {
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        res.json(comment);
    } else {
        res.status(404).json({ message: `Comment ${req.params.id} does not exist` });
    }
});

// Create DELETE /comments/:id route that deletes a comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (comment) {
        const index = comments.indexOf(comment);
        comments.splice(index, 1);
        res.json(comment);
    } else {
        res.status(404).json({ message: `Comment ${req.params.id} does not exist` });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
