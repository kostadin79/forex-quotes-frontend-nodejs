const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    // if (quotesContainer[codes[0]].rates.length < 2) {
    //     return res.status(404).send({
    //         message: "Wait!"
    //     })
    // }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    console.log('In the middleware something is happening-->')
    next()
});
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;