const express = require('express')
const app = express()
const port = 3000

const cors = require("cors");
var router = require('./routes');
var bodyParser = require("body-parser");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('/api', router);

app.use(express.static('./client/dist'))

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))