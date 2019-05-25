const express = require('express');
const router = express.Router();
const axios = require('axios');
//reduce((acc, current) => [...acc, { location: current.scannedLocation, detail: current.instructions, date: `${current.scanDateTime}` }],[]);
router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    return axios.get(`https://ecomexpress.in/tracking/?awb_field=${trackingId}`)
    .then(response => {
        let temp = response.data.substring(response.data.lastIndexOf("<script>") + 23, response.data.lastIndexOf("if(response==='No Record Found'){")).trim();
        if (temp == "'No Record Found';"){
            res.json({
                result: temp
            })  
        } else {
            let jsonObject = JSON.parse(temp.substring(1,temp.length - 2)); 
            let modified = jsonObject.scans.scans.reduce((acc, current) => [...acc, { location: current[2], detail: current[3], date: `${current[0]} ${current[1]}` }],[]);
            res.json({
                result: modified
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: err
        })
    })
})

module.exports = router;