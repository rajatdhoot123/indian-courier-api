const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    axios.get(`https://uxxbqylwa3.execute-api.ap-southeast-1.amazonaws.com/prod/track?waybillId=${trackingId}`)
    .then(response => {
        (!response.data.data[0].destination) ? res.json({ result: `Invalid Tracking No. ${trackingId}` }) : res.json({ result: response.data.data })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: err
        })
    })
})

module.exports = router;