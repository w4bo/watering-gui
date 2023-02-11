const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/submit", (req, res) => {
    res.send(req.body)
})

const port = 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});