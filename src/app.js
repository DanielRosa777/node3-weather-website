const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Rosa',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Daniel Rosa',
        message: 'Help message for the weather app.',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Daniel Rosa',
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide a address'
        });
        return;
    }
    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error){
            res.send({
                error: error
            });
            return;
        }
        forecast(lon, lat, (error, data) => {
            if(error){
                res.send({
                    error: error
                });
                return;
            }
            res.send({
                address: req.query.address,
                location: location,
                forecast: data
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        });
        return;
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Rosa',
        errorMessage: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Rosa',
        errorMessage: 'Page not found',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});