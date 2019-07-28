const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    return axios.get(`https://www.dhl.co.in/shipmentTracking?AWB=${trackingId}`)
    .then(({data}) => {
        if(data.errors){
            return res.json({ result: `Invalid Tracking No. ${trackingId}` })
        }
        console.warn(data.results[0].checkpoints)
        let final = data.results[0].checkpoints.reduce((acc, current) => [...acc, { location: current.location, detail: current.description, date: `${current.date}` }],[]);
        return res.json({ result: final })
    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
})

module.exports = router;