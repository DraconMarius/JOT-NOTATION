/* 
- [ ] Need a landing page before taken to the notes page
- [ ] Note page that has saved notes on the left
- [ ] Editor to name your Note and body on the right
- [ ] Only when there are items in the notes field, a save button appear
- [ ] Functional save button to append new note to app
- [ ] Existing Notes are recallable
- [ ] Write Icon button to go back to editor
SERVER 
- [X] routes to landing page
- [ ] routes to notes page
- [ ] API Routes for `GET/POST` notes from db




*/


//express.js server
const express = require('express');
const path = require('path');
// const apiRoute = require('./routes');

const app = express();
const PORT = process.env.port || 3001

app.use(express.static('public')) //root route to show index.html w/ resources
app.use(express.urlencoded({ extended: true })); //middleware for parsing schtuff
app.use(express.json());

//all api routes in `routes` folder
// app.use('/api', apiRoute);

//homePage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//notesPage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () =>
    console.log(`APP Listening at http://localhost:${PORT}`));
