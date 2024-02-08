import express from 'express';
import mongoose from 'mongoose';
import ShortUrl from './models/shortUrl.js';
const LOCAL_CONNECTION_URL = 'mongodb://localhost/urlShortener';
const HOST_NAME = process.env.HOST_NAME || 'http://localhost:3000';
const app = express();
mongoose.connect(process.env.PROD_CONNECTION_URL || LOCAL_CONNECTION_URL);

//Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/', async (req, res) => {
  const shortUrlsData = await ShortUrl.find();
  res.render('index', { shortUrlsData });
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({
    short: `${HOST_NAME}/${req.params.shortUrl}`,
  });
  if (shortUrl === null) {
    return res.sendStatus(404); // If no shortUrl exists, return 404 Not found
  }

  shortUrl.clicks++; //Increments counter
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect('/');
});

//Server
app.listen(process.env.PORT || 3000, console.log('Server Started!'));
