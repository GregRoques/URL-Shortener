const express = require("express");
const router = express.Router();
const db = require("../util/database");

router.post("/redirect", (req, res, next) => {
    const hashSearch = req.body.data.hash;
    console.log(hashSearch);
    const selectUrl = "SELECT url FROM urls WHERE hash = $1";
    db.query(selectUrl, [hashSearch]).then(results => {
        res.json(results);
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

module.exports = router;
