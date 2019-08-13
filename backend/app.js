const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 2000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {

});

app.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
