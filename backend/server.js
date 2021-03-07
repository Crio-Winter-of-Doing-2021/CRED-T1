const express = require('express');
// const mongoose = require('mongoose');

require('dotenv').config();

const app = new express();
const port = 8000;

app.use(express.json());

app.use('/', (req, res) => {
    return res.status(200).json("Hello world!");
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});