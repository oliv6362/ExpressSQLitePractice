var express = require('express');
var router = express.Router();

const db = require('../db'); // Adjust the path as necessary


/* GET user page. */
router.get('/', function(req, res, next) {
  res.send('Got a get request');
});


// POST route to handle the form submission
  router.post('/', async (req, res) => {
      // req.body with the form data
    const { fName, lName, phone } = req.body;
  
    try {
    // call the addUser function with the form data
    const userData = await db.addUser(fName, lName, phone);
    console.log(`A row has been inserted with rowid ${userData.id}`);
    
    // Redirect to the success page
    res.redirect('/success');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('An error occurred while saving user data.');
  }
});

module.exports = router;
