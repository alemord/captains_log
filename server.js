const express = require('express');
const mongoose = require('mongoose');
const jsx = require('jsx-view-engine');
const path = require('path');
const Log = require('./models/logs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3007
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
app.use(methodOverride('_method'));
// define routes
app.get('/', (req, res) => {
  res.redirect('/logs');
});

app.get('/logs/new', (req, res) => {
  res.render('New');
});

app.get('/logs/:id', (req, res) => {
  const logId = req.params.id;
  Log.findById(logId, (err, foundLog) => {
    if (err) {
      console.log(err);
    } else {
      res.render('Show', { log: foundLog });
    }
  });
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
app.delete('/logs/:id', (req, res) => {
  const logId = req.params.id;
  Log.findByIdAndDelete(logId, (err, deletedLog) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
    res.redirect('/logs');
  });
});

app.get('/logs/:id/edit', async (req, res) => {
  const log = await Logs.findById(req.params.id);
  res.render('Edit', { log });
});


app.post('/logs', async (req, res) => {
  const { title, entry, shipIsBroken } = req.body;
  const isShipBroken = (shipIsBroken === 'true');
  
  const log = new Log({
    title,
    entry,
    shipIsBroken: isShipBroken  
  });

  try {
    const savedLog = await log.save();
    res.redirect('/logs');
  } catch (err) {
    console.warn(err);
    return res.status(500).send(err);
  }
});


// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
