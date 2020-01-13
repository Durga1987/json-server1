var fs = require('fs');
const express = require('express');
const app = express()
const port = 9000
var cors = require('cors');
// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));

// Change the content of the file as you want
// or either set fileContent to null to create an empty file
var filepath = "Errorlog.txt";
var fileContent = "Hello Worldsdsdsdsd!";
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var allowCrossDomain = function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', "http://localhost:3000");
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
   
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
     res.header('Access-Control-Allow-Credentials',true);
     next();
 }
 app.use(allowCrossDomain);
app.get('/error', (req, res) =>{

    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;

        console.log("The file was succesfully saved!");
    })
    res.send('Hello World!')
})
app.post('/api/saveError', function(req, res) {
    console.log(req);
    const str = JSON.stringify(req.body);
    if(fs.existsSync(filepath)){
        fs.appendFile(filepath, str, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
    else{
    fs.writeFile(filepath, str, (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
    })
}
    res.send(str);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// The absolute path of the new file with its name
