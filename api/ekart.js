const express = require('express');
const router = express.Router();
const tabletojson = require('tabletojson');

let url = 'https://www.ekartlogistics.com/track/';

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    tabletojson.convertUrl(url + trackingId)
        .then(tablesAsJson => 
        {   
                (!tablesAsJson || !tablesAsJson.length) ? res.json({ result: `Invalid Tracking Id ${trackingId}`}) : res.json({result: tablesAsJson[1]})
        }
    )
})

module.exports = router;