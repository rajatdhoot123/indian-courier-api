# Indian Courier Tracking Service API

V2 Version is in Progress

## Track your Parcels directly here (Still WIP)

--> https://indian-courier-api-premium.vercel.app

## Getting Started

This project is based on nodejs help to track the courier servies provider in India.

You can use this project to build your courier tracking app as it return the response in json format.

### How to Start

-->You can download zip or git clone https://github.com/rajatdhoot123/indian-courier-api.git

-->You can install all dependency by running command on bash(Terminal): npm install

-->Then run: yarn start or npm start

-->Then Open Browser and hit url mentioned below like

###### Example

If You want to track Ekart with Tracking Id: FMPC0279658213 then in chrome visit url localhost:5050/ekart/FMPC0279658213

And then you will get Json Object with all tracking Details

#### Current Supported Courier service and their endpoints

| Service Providers | Status  |
| :---------------- | :-----: |
| Ekart             | Working |
| Ecom              | Working |
| Delhivery         | Working |
| Xpressbees        |   NA    |
| Bluedart          | Working |
| Gati              |   NA    |
| DTDC              | Working |
| Shadowfax         |   NA    |
| DHL               | Working |
| Maruti(Beta)      | Working |

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

courier_provider = ekart | ecom | delhivery | xpressbees | bluedart | dtdc | gati | shadowfax

trackingId = Your Parcel Tracking id like-> FMPC0279658213

https://indian-courier-api-premium.vercel.app/api/{courier_provider}/{trackingId}

Replace courier_provider and trackingId in above api to get your tracking json response

Example ->

https://indian-courier-api-premium.vercel.app/api/ekart/FMPC0279658213


@rrjanbiah Thanks for helping in adding more and more vendors