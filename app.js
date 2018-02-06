const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");

var request = require('request-promise'),
    Bluebird = require('bluebird'),
    username = "corey@pizzaluce.com",
    token = "qN9P_wCCgLK7Bmn-9zZA",
    baseUrl = "https://business.untappd.com/api/v1/",
    auth = "Basic " + new Buffer(username + ":" + token).toString("base64");
    
var locIds = [];
var locMenuReq = [];
var dulMenuList = [];
var toPage;

var locationMenus = {
  pl1: [],
  pl2: [],
  pl3: [],
  pl4: [],
  pl5: [],
  pl6: [],
  pl7: [],
  pl8: []
};

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
//Restructure these requests using Promises
// https://medium.com/adobe-io/how-to-combine-rest-api-calls-with-javascript-promises-in-node-js-or-openwhisk-d96cbc10f299

//https://business.untappd.com/api/v1/locations/3/menus

  
request({
  url: baseUrl + "locations", 
  headers: {
    "Authorization" : auth
  }
}).then(
    function(resp1) {
      var response1 = JSON.parse(resp1);
     
     for (var id in response1.locations){
          locIds.push({id : response1.locations[id]["id"], name: response1.locations[id]["name"]});
     }
      return locIds;
    }).then(
      function(locIds) {
       //Make a URL for the menu request using IDs. 
       for (var id in locIds){
         locMenuReq.push({id: locIds[id]["id"], name: locIds[id]["name"], url: baseUrl + "locations/" + locIds[id]["id"] + "/menus"});
       }
       return locMenuReq;
      }
    ).then(function(locMenuReq){
      //build menu requests by location
      var pl1 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Downtown"),
          pl2 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Uptown "),
          pl3 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Duluth"),
          pl4 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Seward"),
          pl5 = locMenuReq.findIndex(x => x.name=="Pizza Lucé St. Paul"),
          pl6 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Hopkins "),
          pl7 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Richfield "),
          pl8 = locMenuReq.findIndex(x => x.name=="Pizza Lucé Roseville ");
          
      var menuRequest1 = request({
                          url: locMenuReq[pl1].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
      
      var menuRequest2 = request({
                          url: locMenuReq[pl2].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
       
      var menuRequest3 = request({
                          url: locMenuReq[pl3].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
      
      var menuRequest4 = request({
                          url: locMenuReq[pl4].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
                         
      var menuRequest5 = request({
                          url: locMenuReq[pl5].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
                         
      var menuRequest6 = request({
                          url: locMenuReq[pl6].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
                         
      var menuRequest7 = request({
                          url: locMenuReq[pl7].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
                         
      var menuRequest8 = request({
                          url: locMenuReq[pl8].url,
                          headers: {
                            "Authorization" : auth
                          }
                         });
      Bluebird.all([menuRequest1, menuRequest2, menuRequest3, menuRequest4, menuRequest5, menuRequest6, menuRequest7, menuRequest8])
        .spread(function (respOfReq1, respOfReq2, respOfReq3, respOfReq4, respOfReq5, respOfReq6, respOfReq7, respOfReq8){
          var dtMenus = JSON.parse(respOfReq1);
          for (var id in dtMenus.menus){
            locationMenus.pl1.push({id: dtMenus.menus[id]["id"]});
          }
          
          var upMenus = JSON.parse(respOfReq2);
          for (var id in upMenus.menus){
            locationMenus.pl2.push({id: upMenus.menus[id]["id"]});
          }
          
         var dulMenus = JSON.parse(respOfReq3);
          for (var id in dulMenus.menus){
            locationMenus.pl3.push({id: dulMenus.menus[id]["id"]});
          }
          
         var sewMenus = JSON.parse(respOfReq4);
          for (var id in sewMenus.menus){
            locationMenus.pl4.push({id: sewMenus.menus[id]["id"]});
          }
          
         var stpMenus = JSON.parse(respOfReq5);
          for (var id in stpMenus.menus){
            locationMenus.pl5.push({id: stpMenus.menus[id]["id"]});
          }
          
         var hopMenus = JSON.parse(respOfReq6);
          for (var id in hopMenus.menus){
            locationMenus.pl6.push({id: hopMenus.menus[id]["id"]});
          }
          
         var richMenus = JSON.parse(respOfReq7);
          for (var id in richMenus.menus){
            locationMenus.pl7.push({id: richMenus.menus[id]["id"]});
          }
          
         var roseMenus = JSON.parse(respOfReq8);
          for (var id in roseMenus.menus){
            locationMenus.pl8.push({id: roseMenus.menus[id]["id"]});
          }
          
          return locationMenus;
        })
        .catch(function (err){
          console.log(err);
        }).then(function(locationMenus){
          console.log(locationMenus);
        })
      
      });
  
    
/*
    var index = locMenuReq.findIndex(x => x.name=="Pizza Lucé Duluth");
    request({
      url: locMenuReq[4].url,
      headers: {
        "Authorization" : auth
      }
    }).then(
      function(dulResp) {
        var dulData = JSON.parse(dulResp);
       for (var id in dulData.menus){
         dulMenuList.push({menuid: dulData.menus[id]["id"], menuname: dulData.menus[id]["name"], unpublished: dulData.menus[id]["unpublished"]});
       }
       return dulMenuList;
      }
      ).then(function(dulMenuList){
        console.log(dulMenuList.length);
        return dulMenuList
      }).then(res.render("duluth", {dulMenuList: dulMenuList})
          
        );
      //res.render("duluth", {dulMenuList : dulMenuList});

    
  
  
  
 /* .then(function(locMenuReq){
       var index = locMenuReq.findIndex(x => x.name=="Pizza Lucé Duluth");
         console.log(index);
       
         
       });
 */ 
  
  
  
  app.listen(process.env.PORT, function(){
    console.log("Server has started");
});
  
  
/*  request({
    url : baseUrl + "locations",
    headers: {
      "Authorization" : auth
    }
  }).then(
      function(body){
        var data = JSON.parse(body);
        //get the stupid id that you need for the next call
        var dt = data.locations[5].id;
        dt = dt.toString();
       // console.log(dt);
       return dt;
        
      }).then(function(dt){
        request({
          url: baseUrl + "locations/" + dt + "/menus",
          headers: {
            "Authorization" : auth
          }
        })}).then(
            function(menus){
              var dtMenus = JSON.parse(menus);
              //test this bullshit
              var dtMenus = dtMenus.menus;
              var dtMenuIds = [];
              // now loop though json
              // save menu id and menu name to array called menus
              for (var i = 0; i < dtMenus.length; i++) {
                dtMenuIds[i] = {
                  id: dtMenus[i].id,
                  name: dtMenus[i].name,
                  position: dtMenus[i].position
                };
                console.log(dtMenuIds);
                return dtMenuIds;
              }
                
            }
          
          ).then(
        function(dtMenuIds){
          console.log(dtMenuIds);
        }
        
        
        );
    
    

    
    /*then(
   
   
        request({
          url: url + "/" + dt + "/menus",
          headers: {
            "Authorization" : auth
          }
        }).then(
            function(body){
              var data = JSON.parse(body);
              console.log(data);
            }
          )
      
    ); */

  
 
  
  
  
 /* request(
    {
      url : url, 
      headers : {
        "Authorization" : auth
      }
    },
    function (error, response, body) {
      var data = JSON.parse(body);
      console.log(data.locations[5].id);
      console.log(data.locations[5].address1);
      var location = data.locations[5].id;
      console.log(location);
      return location;
    }
    
    );
     
     request(
       {
         url : url + "/4701/menus",
         headers : {
           "Authorization" : auth
         }
     },
     function (error, response, body) {
       var menus = JSON.parse(body);
       console.log(menus.menus[0].name);
       var draftBeer = menus.menus[0].id;
     }
     );
     
     request(
     {
       url : "https://business.untappd.com/api/v1/menus/25385/sections",
       headers: {
         "Authorization" : auth
       }
     },
     function (error, response, body) {
       var sections = JSON.parse(body);
       console.log(body);
     }
     );
     
    
  // app.get('/downtown', function (req, res){
  //   let store = req.body.location
     
     
  // });
 
   */
    







