const express = require("express");
const router = express.Router();
const db = require("../util/database");

router.use((req, res, next) => {
    console.log(req.body.method, req.body.url, req.body.data);
    next();
});

router.get("/redirect", (req, res) => {
    const hashSearch = req.data.hash;
    console.log(hashSearch);
    const selectUrl = `Select url from urls where hash = '${hashSearch}'`;
    db.execute(selectUrl).then(results => {
        console.log(results);
        res.json(results);
    }).catch(err => {
        console.log(err);
        if (err) {
            throw err;
        }
    });
});

module.exports = router;
