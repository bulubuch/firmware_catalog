const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../layout/index.html'));
});

router.get('/', (req, res) => {
	res.send('It works!');
  });
  
module.exports = router;