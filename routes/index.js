const express = require('express');
const api = require('express').Router();
const fs = require('fs');

//api/notes GET, readFile and response with saved notes obj
api.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        };
    });
});

module.exports = (api);