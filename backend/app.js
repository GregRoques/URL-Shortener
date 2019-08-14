const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const PORT = 2000;

const hash = require("./routes/hash");
const redirect = require("./routes/redirect");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

app.use(hash);
app.use("/:hash", redirect);

app.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
