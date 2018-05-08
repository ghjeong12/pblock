module.exports = function(app, fs)
{
  app.get('/imgs', function(req, res){
      fs.readFile('./assets/img/rabbit_64.png', function (error, data) {
          res.writeHead(200, { 'Content-Type':'text/html' });
          res.end(data);
        });
    });
  app.get('/imgs/rabbit', function(req, res){
      fs.readFile('./assets/img/rabbit.png', function (error, data) {
          res.writeHead(200, { 'Content-Type':'text/html' });
          res.end(data);
        });
    });
  app.get('/imgs/animal-track', function(req, res){
      fs.readFile('./assets/img/animal-track.png', function (error, data) {
          res.writeHead(200, { 'Content-Type':'text/html' });
          res.end(data);
        });
    });
  app.get('/imgs/trees', function(req, res){
      fs.readFile('./assets/img/trees.png', function (error, data) {
          res.writeHead(200, { 'Content-Type':'text/html' });
          res.end(data);
        });
    });
  app.get('/imgs/lion', function(req, res){
      fs.readFile('./assets/img/lion.png', function (error, data) {
          res.writeHead(200, { 'Content-Type':'text/html' });
          res.end(data);
        });
    });
  app.get('/imgs/waterfall', function(req, res){
      fs.readFile('./assets/img/waterfall.png', function (error, data) {
          res.writeHead(200, { 'Content-Type':'text/html' });
          res.end(data);
        });
    });




  app.get('/',function(req,res){
    res.render('index', {
    result: "",
    num_lines: 0
    })
  });
  var multer = require('multer');
  var upload = multer({dest: 'uploads/'});
  const google_vision = require('@google-cloud/vision');
  const client = new google_vision.ImageAnnotatorClient({
  keyFilename: '/home/ghjeong12/cdesign/My First Project-74d726b9ea5d.json'});

  /* After uploading an image */
  app.post('/upload', upload.single('image'), function(req, res, next) {

     // Choose what the Vision API should detect
     // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var types = ['labels'];
  client.textDetection(req.file.path)
  .then(results => {
    const detections = results[0].textAnnotations;
    //console.log('Text:');
    //detections.forEach(text => console.log(text));
    })
  .catch(err => {
    console.error('ERROR:', err);
    });

  /* sleep function */
  function sleepFor( sleepDuration ){
        var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
  }
  //var move = require('move-js');
  /* Get documentTextDetection result */
 client.documentTextDetection(req.file.path)
  .then(results => {
    const fullTextAnnotation = results[0].fullTextAnnotation;
    console.log('Document:');
    console.log(fullTextAnnotation.text);
    var result = fullTextAnnotation.text;
    // The last line is dummy line
    var result_lines = result.split("\n");

    res.render('index',
      {
        result : fullTextAnnotation.text,
        num_lines : result_lines.length
      });

    if(result_lines.length >= 2)
    {
      console.log("#1 "+ result_lines[0]);
      console.log("#2 "+ result_lines[1]);
      //sleepFor(1000);
      //console.log("one sec");
      //move('#example-1 .box')
      //.set('margin-left', 200)
      //.end();
      //sleepFor(1000);
      console.log("two sec");
    }


  })
  .catch(err => {
    console.error('ERROR:', err);
    });
  });

 }

