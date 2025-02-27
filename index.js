const express = require('express');
const mongoose = require("mongoose")
const app = express();



const Car = require("./models/user.js")

app.use(express.json())


    try{
         mongoose.connect("mongodb+srv://soulBurner:Heatsoul.5@soulburner.vrm4f.mongodb.net/?retryWrites=true&w=majority&appName=soulBurner")
         console.log("yes")
         app.listen(3000, () => {
            console.log('السيرفر شغال على http://localhost:3000');
        });
        
        
        
     
     }catch(err){
         console.log(err)
     }
     //mongodb+srv://soulBurner:<db_password>@soulburner.vrm4f.mongodb.net/?retryWrites=true&w=majority&appName=soulBurner













app.post("/user", async (req,res)=>{
   
    const car =  new Car()
    const username = req.body.name
    const usepass = req.body.pass
    car.name = username
    car.pass =usepass
    await car.save()
    

    res.send("signed in successfully")
})

app.get("/user", async (req,res)=>{
   
   const car = await Car.find()
   res.json(car)

    

    res.send("signed in successfully")
})



