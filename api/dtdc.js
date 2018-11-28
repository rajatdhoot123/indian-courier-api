const express = require('express');
const router = express.Router();
const axios = require('axios')


router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    axios.get(`http://track.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=getLoadMovementDetails&cnNo=${trackingId}`)
    .then(response => {
        if(response.data[0].activityType == "Invalid Data"){
            return res.json({ result: `Invalid Tracking No. ${trackingId}` })
        }
        let final = response.data.reduce((acc, current) => [...acc, { location: `${current.origin}`, detail: `${current.activityType}`,  status: `${current.deliveryStatus}`, date: `${current.dateWithNoSuffix}`, time: `${current.time}` }],[]);
        return res.json({ result: final })
    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
})

module.exports = router;