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




module.exports = (api);