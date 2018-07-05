var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var multer = require('multer');
var cors = require('cors');


app.use(cors());
app.use(fileUpload());
app.use(express.static(__dirname + '/uploads'));



app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./uploads/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.json({'imgname':sampleFile.name});
  });
});


app.get('/file/:name', function(req,res){
    res.sendFile(__dirname + '/uploads/'+req.params.name);
});

app.listen('3000', function(){
    console.log('running on 3000...');
});