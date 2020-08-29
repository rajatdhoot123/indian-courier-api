const express = require('express');
const router = express.Router();
const tabletojson = require('tabletojson').Tabletojson;

let url = 'https://www.ekartlogistics.com/track/';

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    tabletojson.convertUrl(url + trackingId)
        .then(tablesAsJson => {
            if (!tablesAsJson || !tablesAsJson.length){
                return res.json({ result: `Invalid Tracking Id ${trackingId}` })
            } else {
                let modified = tablesAsJson[1].reduce((acc, current) => [...acc, { location: current.Place, detail: current.Status, date: `${current.Date} ${current.Time}` }], [])
                return res.json({ result: modified })
            }
        }
    )
})

module.exports = router;