const path = require('path');
const express = require('express');
const app = express();
const os = require('os');

// constants
const PORT = process.env.PORT || 8080;
const DIST_PATH = path.join(__dirname, '../../dist');
// const nasaURL = process.env.NASA_API_KEY ? `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}` : null;

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(DIST_PATH));

// serve index.html
app.get('*', (req, res) => {
    res.send(path.join(__dirname, '../../public/index.html'));
});

// fetch a username using os
const userName = os.userInfo().username
app.get('/api/getUserName', (req, res) => res.send(userName ? userName : 'stranger'));

// error handlilng middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// initiate server + start listening + catch errors
const init = async () => {
    try {
        app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}
init();


