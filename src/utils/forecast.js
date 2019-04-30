const request = require('request')

const forecast = (longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/8608a05216e6f91e42287df4bc0b2a67/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to Connect to weather service',undefined)
      }
      else if(body.error){
        callback(response.body.error,undefined)
      }
      else{
        callback(undefined,body.daily.data[0].summary + ' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+ '% chance of rain.')
      }
    })
  }

  module.exports = forecast