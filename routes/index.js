const express = require('express');
const api = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//api/notes GET, readFile and response with saved notes obj
api.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        //practicing those ternary statments
        err ? console.error(err) : res.json(JSON.parse(data));
    })
});

//api/notes POST, take the req's body and save it into our db
api.post('/notes', (req, res) => {
    // console.log(req.body); // to see what the request looks

    fs.readFile('./db/db.json', (err, data) => { //make sure we ready the most updated db before adding
        if (err) {
            console.error(err);
        } else {
            const noteDB = JSON.parse(data); //parsed db data
            let newNotes = {
                id: uuidv4(), //need special ID for recall in client side
                title: req.body.title,
                text: req.body.text,
            }
            noteDB.push(newNotes); //push that data into the array
            fs.writeFile('./db/db.json', JSON.stringify(noteDB, null, 3), (err) => //write the new file completely including the new note
                err ? console.error(err) : console.log("Note Saved Sucessfully")
            )
        };
    });

    res.send("sucessfully saved"); //was getting stuck and not fullfilling the promise due to missing res param
});

//api/notes DELETE in starter code they fetch based on the id, hence we have the query :id
//line 45 in index.js (public => html), they only send the id as the body //line 86 in same file already parsed it, we should be good
api.delete('/notes/:id', (req, res) => {
    let noteID = req.params.id;
    // console.log(req.params.id); //ah we are not using a body here, but a parameter, and still and obj when goes through the route

    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let noteDB = JSON.parse(data); //parsed the db data again so we can iterate through, changed to let here since we will be splicing items
            for (let i = 0; i < noteDB.length; i++) {
                if (noteID === noteDB[i].id) { //do the work if the ID matches the one that we have in our db
                    noteDB.splice(i, 1) // if it matches, we splice it out of the array @ that index, and remove 1 item
                }; //oh crap I think we have to write file to overwrite what we had in the DB. 
            };
            fs.writeFile('./db/db.json', JSON.stringify(noteDB, null, 3), (err) => //write the new file completely including the new note
                err ? console.error(err) : console.log("Sucessfully Write to DB with updated contents")
            )
        };
    });
    res.send("sucessfully deleted");
});




module.exports = (api);