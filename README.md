# Indian Courier Tracking Service API 

## Getting Started

This project is based on nodejs help to track the courier servies provider in India.

You can use this project to build your courier tracking app as it return the response in json format.

### How to Start

-->You can download zip or git clone https://github.com/rajatdhoot123/indian-courier-api.git 

-->You can install all dependency by running command on bash(Terminal):   npm install

-->Then run:  yarn start or npm start

-->Then Open Browser and hit url mentioned below like

###### Example

If You want to track Ekart with Tracking Id: FMPC0279658213 then in chrome visit url localhost:5050/ekart/FMPC0279658213

And then you will get Json Object with all tracking Details

#### Current Supported Courier service and their endpoints

###### Get Request

| Service Providers    | Api EndPoints                          |
| :---                 |     :---:                              |
| Ekart                | localhost:5050/ekart/{TrackingId}      |
| Ecom                 | localhost:5050/ecom/{TrackingId}       | 
| Delhivery            | localhost:5050/delhivery/{TrackingId}  | 
| Xpressbees           | localhost:5050/xpressbees/{TrackingId} | 
| Bluedart             | localhost:5050/bluedart/{TrackingId}   | 
| Gati                 | localhost:5050/gati/{TrackingId}       | 
| DTDC                 | localhost:5050/dtdc/{TrackingId}       |
| Shadowfax            | localhost:5050/shadowfax/{TrackingId}  |

###### Tip: Directly insert tracking id in api end point instead of {TrackingId}

###### API Respone Format

If your request is successfull then response will contain three keys i.e. location, detail, date.
Check the example below.

Example
```
    {
        "location": "BENGALURU",
        "detail": "Shipment delivered",
        "date": "26 Mar, 2018 12:50 hrs"
    },
```

### Deployed on Heroku

Now you can use directly heroku end point and get the tracking details as json response

courier_provider = ekart | ecom | delhivery | xpressbees | bluedart |  dtdc | gati | shadowfax

trackingId = Your Parcel Tracking id like-> FMPC0279658213

https://indian-courier-api.herokuapp.com/{courier_provider}/{trackingId}

Replace courier_provider and trackingId in above api to get your tracking json response

Example ->

https://indian-courier-api.herokuapp.com/ekart/FMPC0279658213