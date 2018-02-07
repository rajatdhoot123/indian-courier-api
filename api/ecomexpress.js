const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/:awb', (req, res) => {
    let trackingId = req.params.awb
    axios.get(`https://ecomexpress.in/tracking/?awb_field=${trackingId}`)
    .then(response => {
        let temp = response.data.substring(response.data.lastIndexOf("<script>") + 23, response.data.lastIndexOf("if(response==='No Record Found'){")).trim();
        if (temp == "'No Record Found';"){
            res.json({
                result: temp
            })  
        } else {
            let jsonObject = JSON.parse(temp.substring(1,temp.length - 2)); 
            res.json({
                result: jsonObject
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