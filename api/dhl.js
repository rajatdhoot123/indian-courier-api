const express = require('express');
const router = express.Router();
const tabletojson = require('tabletojson');
const axios = require('axios')

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    let url = `https://www.dhl.co.in/en/express/tracking.html?AWB=${trackingId}`;
    return axios.get(url)
    .then(response => {
        if(response.data[0].activityType == "Invalid Data"){
            return res.json({ result: `Invalid Tracking No. ${trackingId}` })
        }
        let final = response.data.reduce((acc, current) => [...acc, { location: `${current.origin}`, detail: `${current.activityType}`.replace(/<\/?[^>]+(>|$)/g, ""),  status: `${current.deliveryStatus}`, date: `${current.dateWithNoSuffix}`, time: `${current.time}` }],[]);
        return res.json({ result: final })
    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
})

module.exports = router;
