const express = require("express");
const router = express.Router();
const db = require("../util/database");

router.post(":hash", (req, res, next) => {
    const hashSearch = req.params.hash;
    const selectUrl = "SELECT url FROM urls WHERE hash = $1";
    db.query(selectUrl, [hashSearch]).then(res => {
        // res.json(res);
        console.log(res);
    }).catch(err => {
        console.log(err);
        res.json("error");
    });
});

module.exports = router;
