const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    return axios.get(`https://saruman.shadowfax.in/web_app/delivery/extended_tracker/${trackingId}`)
    .then(response => {
        console.warn("Hehrehrehreh")
        let final = response.data.data.reduce((acc, current) => [...acc, { location: current.warehouse_name, detail: current.text, date: `${current.time}` }],[]);
        return res.json({ result: final })
    })
    .catch(err => {
        return res.json({
            error: err.data
        })
    })
})

module.exports = router;