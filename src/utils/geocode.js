const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW51cmFnMTcxMCIsImEiOiJjbGN2bmY0OGIwMzhqM3FwaGJnMmR2bDJnIn0.vZXXLOqMle_tHUiDyIkkLg&limit=1"
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to the server', undefined);
        } else if (response.body.error) {
            callback('unable to find location, please try again');
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            }); 
        }
    })
}

module.exports = geocode;