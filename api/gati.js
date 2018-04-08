const express = require('express');
const router = express.Router();
const FormData = require('form-data');
const querystring = require('querystring');
const request = require('request');
const tabletojson = require('tabletojson');


router.get('/:awb', (req, response) => {
    let tracking = req.params.awb;
    const form = {
        status: 'status_docket',
        docket_id: tracking,
        recName: '',
        track1: 'Submit'
    };

    const formData = querystring.stringify(form);
    const contentLength = formData.length;

    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'https://www.gati.com/track-by-docket',
        body: formData,
        method: 'POST'
    }, function (err, res, body) {
        if(tabletojson.convert(body)[1][0].Destination == "No data found with this docket number."){
            return response.json({
                error: `Invalid Tracking Id ${tracking}`
            })
        }
        else {
            let modified = tabletojson.convert(body)[2].filter(track => !!track.Location).reduce((acc, current) => [...acc, { location: current.Location, detail: current.Status_2, date: `${current.Date} ${current.Time}` }], [])
            return response.json({
                result: modified
            })
        }
    })
})

module.exports = router;