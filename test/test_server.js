let express = require('express');
let app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.listen(9999);

app.post('/notification', (req, res) =>{
    console.log(req.body);
})