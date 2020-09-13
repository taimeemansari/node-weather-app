const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const location = process.argv[2];

//setting paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'home',
    content: 'Get live weather for your location',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    content: 'About page content',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    content: 'Help page content',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.send('404 page not found');
});

app.listen('3000', () => {
  console.log('Express server started!!!');
});
