var WebSocket = require("ws");
const express = require('express');
const router =express.Router();
let user = "wssand048";
let pwd = "dennis048";


//,

// enter the port you have been given for RT data. Production = 8082, Sandbox = 8084
let port = "8084"
var connection = null;
var isConnected = connect();
var url=null;
var heartbeattime = new Date(Date.now() + 3600*1000*5.5);

var symbols = ["GOLD","SILVER"];

var liveData = [];

var symbolObject =  {
    symbolId : Number,
    symbolName : String,
    LastUpdateTime : Date,
    LTP : String,
    TickVolume : String,
    ATP : String,
    TotalVolume : String,
    Open : String,
    High : String,
    Low : String,
    previousClose : String,
    todaysOl : String,
    PreviousOpen : String,
    turnOver : String,
    bid : String,
    bidQuantity : String,
    ask : String,
    askQuantity : String
}

setInterval(socketstatus,500);

function socketstatus(e)
{
   // console.log(heartbeattime);
}
function connect()
{
    console.log("Connecting..");
    url = 'wss://push.truedata.in:' + port + '?user=' + user + '&password=' + pwd;
    try {
        
          connection = new WebSocket(url);
          connection.onopen = socketonopen;
          connection.onerror = socketonerror;
          connection.onmessage = socketonmessage;
          connection.onclose = socketonclose;
          return true;    
    } catch (error) {
        console.log(error);
        setInterval(connect,7000);
        return false;
    }
    
}

function socketonopen(e)
{
    console.log("Connected Websocket");
}
function socketonerror(e)
{
    console.log("Websocket Error " + e.message);
    
}

function socketonmessage(e)
{
    var jsonObj = JSON.parse(e.data);
    if(jsonObj.success)
    {
        switch(jsonObj.message)
        {
           
            case "TrueData Real Time Data Service":
               //console.log('Symbols:' + jsonObj.maxsymbols + ' Data:' +jsonObj.subscription + ' Valid Upto: ' + jsonObj.validity);
                var jsonRequest = {
                    "method":"addsymbol",
                    "symbols": symbols,
                };
                let s = JSON.stringify(jsonRequest);
                connection.send(s);
                break;
            case "symbols added":
                 console.log('Added Symbols:' + jsonObj.symbolsadded);
                break;
            case "HeartBeat":
                 console.log('Message ' + jsonObj.message + ' Time: ' + jsonObj.timestamp);
                break;
            default:
              console.log(jsonObj);
        }
    }
    if(jsonObj.success == false)
    {
        console.log("Not connected");
    }
    
    if(jsonObj.symbollist)
    {
        const symbolsData=jsonObj.symbollist;
        
        //console.log("symbollist",symbolsData);
        symbolsData.map((data) => {
            symbolObject={};
            symbolObject.symbolName= data[0],
            symbolObject.symbolId = data[1],
            symbolObject.LastUpdateTime = data[2],
            symbolObject.LTP = data[3],
            symbolObject.TickVolume = data[4],
            symbolObject.ATP = data[5],
            symbolObject.TotalVolume = data[6],
            symbolObject.Open = data[7],
            symbolObject.High = data[8],
            symbolObject.Low = data[9],
            symbolObject.previousClose = data[10],
            symbolObject.todaysOl = data[11],
            symbolObject.PreviousOpen = data[12],
            symbolObject.turnOver = data[13],
            symbolObject.bid = data[14],
            symbolObject.bidQuantity = data[15],
            symbolObject.ask = data[16],
            symbolObject.askQuantity = data[17]
            liveData.push(symbolObject);
        });
    }
  
   //console.log(liveData);
    if(jsonObj.trade != null)
    {
     //console.log("livedata",liveData);
      var tradeArray = jsonObj.trade;
     //Find index of specific object using findIndex method.    
     objIndex = liveData.findIndex((obj => obj.symbolId === tradeArray[0]));
     //Update object's High property.
     liveData[objIndex].LastUpdateTime = tradeArray[1],
     liveData[objIndex].LTP = tradeArray[2],
     liveData[objIndex].Volume = tradeArray[3];
    }
    if(jsonObj.bidask !=null)
    {
    var bidaskArray = jsonObj.bidask;

    //Find index of specific object using findIndex method.    
     objIndex = liveData.findIndex((obj => obj.symbolId === bidaskArray[0]));
    //Update object's High property.
     liveData[objIndex].LastUpdateTime = bidaskArray[1],
     liveData[objIndex].bidv = bidaskArray[2],
     liveData[objIndex].bidQuantity = bidaskArray[3],
     liveData[objIndex].ask = bidaskArray[4],
     liveData[objIndex].askQuantity = bidaskArray[5]
    }
    router.get('/get-live-stocks', async (req,res)=>{
        if(!liveData)
        return res.status(200).json({success:false, message:"Stocks not Found.", data:[]});
        res.status(200).json({success:true, message:"Live Stocks Data.", data:liveData}); 
        })
}

function closeConnection()
{
    connection.close();
}

function socketonclose() {
    console.log("Disconnected Websocket");
    //process.exit(0);
    setTimeout(connect,7000);
}

   // Get broker by id
    

module.exports= router;
