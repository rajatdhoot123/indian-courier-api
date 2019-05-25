const express = require('express');
const router = express.Router();
const FormData = require('form-data');
const querystring = require('querystring');
const request = require('request');
const tabletojson = require('tabletojson');


router.get('/:awb', (req, response) => {
    let tracking = req.params.awb;
    const form = {
        handler: 'tnt',
        action: 'awbquery',
        awb: 'awb',
        numbers: tracking
    };

    const formData = querystring.stringify(form);
    const contentLength = formData.length;
    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://www.bluedart.com/servlet/RoutingServlet',
        body: formData,
        method: 'POST'
    }, function (err, res, body) {
        if(tabletojson.convert(body)[6][0][0] === "Status and Scans"){
        let final = tabletojson.convert(body)[6].reduce((acc, current, index) => {
            if(index > 2){
                return [...acc, { location: current['0'], detail: current['1'], date: `${current['2']} ${current['3']}` }]
            }
            return acc;
        },[]);
        final.splice(-2)
        response.json({
            result: final
        }) 
        } else {
            response.json({
                error: `Invalid Tracking Id ${tracking}`
            })
        }
    })
})

module.exports = router;