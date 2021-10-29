
const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiZGFueWVscm9zYSIsImEiOiJja3ZhcG95YWYyZHoyMm9sdTdsNG9obWF1In0.dVxbckk85ebt-WI36crtkg';
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to mapbox service', undefined);
        }else if(body.features.length === 0){
            callback('Unable to get location', undefined);
        }else{
            const data = {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name,
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;
