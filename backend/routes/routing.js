const express = require("express");
const router = express.Router();
const db = require("../util/database");

let newHash = "";
const hasher = () => {
    newHash = "create new hash, check its not a duplicate, assign";
};

router.get("/:hash", (req, res) => {
    const hashSearch = req.params.hash;
    const selectUrl = `SELECT url FROM urls WHERE hash='${hashSearch}'`;
    db.execute(selectUrl).then(results => {
        res.json(results[0][0].url);
    }).catch(err => {
        console.log(err);
        if (err) {
            throw err;
        }
    });
});

router.post("/newurl", (req, res, next) => {
    const originalUrl = req.query.originalurl;
    const urlSearch = `SELECT hash, url FROM urls WHERE url='${originalUrl}'`;
    db.execute(urlSearch).then(results => {
        console.log(results[0][0]);
        res.json(results[0][0]);
    }).catch(async () => {
        await hasher();
        next();
    });
});

router.post("/newurl", (req, res) => {
    console.log(newHash);
});

module.exports = router;
