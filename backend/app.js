const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = 2000;

const routing = require("./routes/routing");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);
app.use(helmet());

app.use("/", routing);

app.listen(PORT, () => {
    console.log("Listening on ", PORT);
});
