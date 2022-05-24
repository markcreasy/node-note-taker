const router = require('express').Router();
const fs = require('fs');
const path = require('path');
let { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  // filter notes array for id (req.params.id)
  const result = notes.filter(note => note.id === req.params.id)[0];
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {

  // create new note object
  let newNote =  { "id": 0, "title": req.body.title, "text": req.body.text};

  // assign a new id, making sure not to set a conflicting value
  notes.forEach((note, i) => {
    if(newNote.id <= note.id){
      newNote.id = note.id + 1;
    }
  });

  // if any data in req.body is incorrect, send 400 error back
  if (req.body.title == '' || req.body.text == '') {
    res.status(400).send('The note is not properly formatted.');
  } else {
    // add new note to the notes array
    notes.push(newNote);

    // write the notes array to the json file
    fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify({ notes: notes }, null, 2)
    );

    // respond with the note array as json
    res.json(notes);
  }
});

router.post('/notes/delete/:id', (req, res) => {
  notes = notes.filter(note => note.id != req.params.id);
  res.json(notes);
});

module.exports  = router;
