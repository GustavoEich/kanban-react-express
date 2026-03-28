const path = require('path');
const express = require('express');
const app = express();

// tells Express where the compiled React files are
app.use(express.static(path.join(__dirname, '../client/dist')));

// "catch-all" route - any request that doesn't match an API route gets the React index.html
app.get('{*path}',(req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});



const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});