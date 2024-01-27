import express from "express";
import mongoose from "mongoose";
import ShortUrl  from "./models/shortUrl.js"
const app = express(); 

mongoose.connect('mongodb://localhost/urlShortener')

//Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}));

//Routes
app.get("/", async (req, res) => {
    const shortUrlsData = await ShortUrl.find()
    res.render('index', {shortUrlsData})
})

app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect("/")
})

//Server 
app.listen(process.env.PORT || 3000, console.log("Server Started!"));