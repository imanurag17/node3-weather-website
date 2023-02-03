const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express()

// define path for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebar engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// for setting up web server to serve a perticular file (setup static directory to serve)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anurag Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Anurag'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'this is a help text!',
        name: 'Anurag'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'help page not found',
        name: 'Anurag Singh'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        console.log(latitude, longitude);
        // forecast(latitude, longitude, (error, forecastData) => {
        //     if (error) {
        //         return res.send({ error })
        //     }
        //     res.send({
        //         address: req.query.address,
        //         forecast: 'forecastData',
        //         location,
        //         latitude,
        //         longitude,
        //     })
        // })
        res.send({
            address: req.query.address,
            latitude,
            longitude,
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Anurag Singh'
    })
})


// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Anurag'
//     }, {
//         name: 'Captian America'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>about page!</h1>')
// })





app.listen(3000, () => {
    console.log('web server is up on localhot:3000');
})