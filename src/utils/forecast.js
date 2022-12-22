const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url =  'http://api.weatherstack.com/current?access_key=53d0ce36653012c04ed0f10216dab488&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)


    request({url: url,json:true} , (error,response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(response.body.error){
            callback('Unable to find a location',undefined)
        }
        else{
            callback(undefined,'It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports = forecast