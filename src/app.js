const express=require("express")
const app=express()
const path=require("path")
const port =process.env.PORT || 3000
////////////////////////////////////////
app.set('view engine', 'hbs');

const viewsDirectory = path.join (__dirname , "../temp1/views" )
app.set( "views" , viewsDirectory)
/////////////////////////////////////////////////////
app.get('/',(req,res)=>{
     res.render('index',{
        title:"Welcome To Website ",
        desc:"THIS WEBSITE TO SHOW WEATHER OF COUNTRY  "
     })

})
////////////////////////////////////////////////////////
const request=require("request")
const forecast = (latitude , longtitude , callback ) => {

    const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" + latitude + "," + longtitude
    
    request ({url, json : true} , (error , response) => {
         
        if(error) {
             callback ("Unable to connect weather service" , undefined)
        } else if(response.body.error){
             callback (response.body.error.message , undefined)
        } else {
                callback (undefined , response.body.location.name + ' It Is  ' + response.body.current.condition.text 
                + " And Temperature    " + response.body.current.temp_c    )
                 
          
               
        }
         
       
    })
    }
forecast(29.871903452398,26.4941838299718,(error,data)=>{
            console.log("error : " + error)
            console.log("data :"+data)
        })

////////////////////////////////
const geocode="https://api.mapbox.com/geocoding/v5/mapbox.places/egypt.json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"
const fore=require("./forcast")
request({url:geocode,json:true},(error,response)=>{
    if(error){
        console.log("unable to connect")
    }else if(response.body.message){
        console.log(response.body.message)
    }else  if(response.body.features.length == 0){
       Console.log("Unable to find location")
    }else {
        const country=response.body.query[0]
        const latation=response.body.features[0].center[0]
        const longation=response.body.features[0].center[1]
        console.log(" the name of country   : " + country )
        console.log(" the name of latation  : " + latation )
        console.log(" the name of longation : " + longation )
        app.get('/CheckWeather',(req,res)=>{
            res.render('CheckWeather',{  
                 country:country,
                 latation:latation,
                 longation:longation,
                 fortest:fore.text,
                 fortem:fore.tem,
            })
        
        })
       
    }
}) 
 
///////////////////////////////////

var hbs = require ('hbs')

const partialsPath = path.join (__dirname , "../temp1/partials")

hbs.registerPartials(partialsPath)
//////////////////////////////////////////////////////
const publicDirect=path.join(__dirname,"../public")
app.use(express.static(publicDirect))

 /////////////////////////////////////////////////////
app.listen(port,()=>{
     console.log(`Example app listening on port ${port}`)

})
 

