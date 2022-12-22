const request = require('request')

const geocode = (address, callback) => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoicHJ1dGh2aXJhamduNyIsImEiOiJjbGJ3eDl2OXcxMWh2NDBueWIwdmc1MHlxIn0.6OAAZjwaoRjEfKhmAcFazQ&limit=1'

    request({url: url,json:true} , (error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find a location',undefined)
        }
        else{
            callback(undefined,{
                latitude:  response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


// const url = 'http://api.weatherstack.com/current?access_key=53d0ce36653012c04ed0f10216dab488&query=37.8267,-122.4233&units=f'

// request({url: url, json:true}, (error,response) => {
//     if(error){
//         console.log('Unable to connect to weather service')
//     }
//     else if(response.body.error){
//         console.log('Unable to find a location')
//     }
//     else{
//         console.log('It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike)
//     }
// })

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1IjoicHJ1dGh2aXJhamduNyIsImEiOiJjbGJ3eDl2OXcxMWh2NDBueWIwdmc1MHlxIn0.6OAAZjwaoRjEfKhmAcFazQ&limit=1'

// request({url: geocodeURL,json: true}, (error,response) => {
//     if(error){
//         console.log('Unable to connect to location service')
//     }
//     else if(response.body.features.length === 0){
//         console.log('Unable to find a location')
//     }
//     else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// })


// geocode('Washington',(error,data)=>{
//     console.log('Error',error)
//     console.log('Data',data)
// })




//console.log('pruthvi')
