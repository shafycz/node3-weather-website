const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../views/views')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Shane Hafycz'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me', 
        name: 'Shane Hafycz'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Help Please',
        title:'Help',
        name:'Shane Hafycz'
    })
})

app.get('/weather',(req,res)=>{
  
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude,latitude,location}={}) => {
        if(error){
          return res.send({error})
       }
    
    
    
       forecast( longitude,latitude, (error, forecastData) => {
         if(error){
           return res.send({error})
         }
  

         res.send( {
            forecast: forecastData,
            location,
            address: req.query.address
        })
        })
    })
   
    
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
     console.log(req.query.search)
     res.send({
            products: []
     })
     
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        
        title:'404',
        error:'Help Article Not found',
        name:'Shane Hafycz'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
     
        title:'404',
        error:'Page Not Found',
        name:'Shane Hafycz'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+port)
})