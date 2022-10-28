const express = require('express');
const api = require('express').Router();
const fs = require('fs');

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
            noteDB.push(req.body); //push that data into the array
            fs.writeFile('./db/db.json', JSON.stringify(noteDB, null, 3), (err) => //write the new file completely including the new note
                err ? console.error(err) : console.log("Note Saved Sucessfully")
            )
        };
    });

    res.send("sucessfully saved");
});




module.exports = (api);