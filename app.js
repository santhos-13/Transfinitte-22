
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const path = require("path");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sessionId = uuid.v4();

const ejs = require('ejs');

const port = 5000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

  app.get('/', (req, res) => {
    res.render('index');
  })

  app.get('/shopping', (req, res) => {
    console.log("redirecting to shopping page");
    // params = req.params;
    res.render('shopping.ejs');
    
  })

  app.post('/restaurants', (req, res) => {
    const data = JSON.stringify(req.body) 
    console.log(data + "backend")
    finaldata = JSON.parse(data)
    res.send("success4u");
    // res.redirect('/restaurants');
    
});
  app.post('/shopping', (req, res) => {
    const data =JSON.stringify(req.body)
    console.log(data + "shopping")
    finaldata=JSON.parse(data)
    // finallycame=JSON.parse(finaldata)
    console.log(finaldata)
    // res.render('shopping.ejs',{finaldata:finaldata})
    console.log("rendering")
    // res.render('shopping.ejs',{finaldata:finaldata})
    res.redirect('http://localhost:5000/shopping');
});

app.post('/send-msg', (req, res) => {
    console.log("world");
    runSample(req.body.MSG).then(data => res.send({ 'Reply': data }));
    // res.send('success');
});




/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'rock-stfd') {
  // A unique identifier for the given session

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "C:/Users/USER/Desktop/TRANSFINITTE/rock-stfd-3cd92afc3349.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

// const sessionPath = `projects/rock-stfd/agent/sessions/${sessionId}`;

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
  return result.fulfillmentText;
}


app.listen(port, () => console.log(`app listening on port ${port}!`))