const request = require('request');




const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=39fb5ee08ca735362be5c1e4189179f5&query='+ lon + ',' + lat + '&units=m';
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback('Unale to find location', undefined);
        }else{
            const data = body.current.weather_descriptions[0] + '. Its is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain. Humidity: ' + body.current.humidity; 
            callback(undefined, data);
            }
    });
}

module.exports = forecast;
