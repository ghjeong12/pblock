module.exports = function(app, fs)
{
  app.get('/',function(req,res){
    res.render('index', {
    length: 5,
    result: ""
    })
  });
  var multer = require('multer');
  var upload = multer({dest: 'uploads/'});
  const google_vision = require('@google-cloud/vision');
  const client = new google_vision.ImageAnnotatorClient({
  keyFilename: '/home/ghjeong12/cdesign/My First Project-74d726b9ea5d.json'});
  app.post('/upload', upload.single('image'), function(req, res, next) {

     // Choose what the Vision API should detect
     // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var types = ['labels'];
  client.textDetection(req.file.path)
  .then(results => {
    const detections = results[0].textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
    })
  .catch(err => {
    console.error('ERROR:', err);
    });

  client.documentTextDetection(req.file.path)
  .then(results => {
    const fullTextAnnotation = results[0].fullTextAnnotation;
    console.log('Document:');
    console.log(fullTextAnnotation.text);
    res.render('index', {result:fullTextAnnotation.text});
    })
  .catch(err => {
    console.error('ERROR:', err);
    });
  });

 }

