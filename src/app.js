const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


const pathtopublicdir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static files location
app.use(express.static(pathtopublicdir))


app.get('', (req,res) => {
    res.render('index', {
        name: 'pruthvi',
        title: 'Weather',
        age: 20
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        name: 'pruthvi',
        title: 'Help',
        age: 20
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        name: 'pruthvi',
        title: 'About me',
        age: 20
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'please provide address query'
        })
    }
    
    const address = req.query.address

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                location,
                data: forecastData,
                address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        name: 'pruthvi',
        title: '404',
        errormsg: 'help article not found',
        age: 20
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        name: 'pruthvi',
        title: '404',
        errormsg: 'page not found',
        age: 20
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        name: 'about',
        age: 20
    })
})

app.listen(port , () => {
    console.log('server set up at port' + port)
})





