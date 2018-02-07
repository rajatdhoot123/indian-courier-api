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

| Service Providers    | Api EndPoints                           |
| :---                 |     :---:                               |
| Ekart                | localhost:5050/ekart/${TrackingId}      |
| Ecom                 | localhost:5050/ecom/${TrackingId}       | 
| Delhivery            | localhost:5050/delhivery/${TrackingId}  | 

Tip: Directly insert tracking id in api end point instead of ${TrackingId}

### Currently work in progress hance used localhost soon deploy somewhere
