const request = require('request')

const forecast = (latidute, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0896810cf4ce4dac03992cf318f275a&query=' + latidute + ',' + longitude + '&units=f'
    request({ url: url, jason: true }, (error, response) => {
        if (error) {
            callback('unable to connect to the server', undefined);
        } else if (response.body.error) {
            callback('unable to find location, please try again', undefined);
        } else {
            //const data = response.body.current
            //console.log(`${data.weather_descriptions[0]}, it is ${data.temperature} degree outside and it feels like ${data.feelslike}`);
            //console.log(response.body.weather_description[0]);
            callback(undefined, `${response.body.current.weather_descriptions[0]}, it is ${response.body.current.temperature} degree outside and it feels like ${response.body.current.feelslike}`)

        } 
    })
}

module.exports = forecast
