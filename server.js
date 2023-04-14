
const express = require('express');
const mongoose = require('mongoose');
const jsx = require('jsx-view-engine');
const path = require('path');
const Log = require('./models/logs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/captains_log';

// set up mongoose connection
mongoose.connect('mongodb+srv://alessandromordini:alessandro123@mordiville.28hcsqj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database, man!'))
  .catch(err => console.log(err));

// set up view engine
app.engine('jsx', jsx.createEngine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');

// add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// define routes
app.get('/', (req, res) => {
  res.redirect('/logs');
});

app.get('/logs', (req, res) => {
    Log.find({})
      .then(logs => {
        res.render('Index', { logs });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Server error');
      });
  });
  
  

app.get('/logs/new', (req, res) => {
  res.render('New');
});

app.post('/logs', (req, res) => {
    const { title, entry, shipIsBroken } = req.body;
    Log.create({ title, entry, shipIsBroken })
      .then(log => {
        console.log(`Created log: ${log}`);
        res.redirect(`/logs/${log._id}`);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Server error');
      });
  });
// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
