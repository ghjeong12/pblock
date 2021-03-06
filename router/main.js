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
  app.get('/imgs/dog', function(req, res){
      fs.readFile('./assets/img/dog.png', function (error, data) {
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
  app.get('/imgs/dog_food', function(req, res){
      fs.readFile('./assets/img/dog_food.png', function (error, data) {
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



  //    var rasp_ip = "119.202.81.78:3000/img";
//    request({uri: rasp_ip}, function(err, response, body) {
//      jsdom.env({
//        html:body,
//        scripts: ['http://code.jquery.com/jquery-1.6.min.js']
//      }, function(err, window){
//        var $ = window.jQuery;
//        res.end($('img').src());
//        }
//      });
//    });
//  });
  app.get('/',function(req,res){
    res.render('index', {
      formula : "",
      result: "",
      num_lines: 0,
      total_ins: "",
      calcul_result:"",
      maze_level : req.body.level
    })

  });
  var multer = require('multer');
  var upload = multer({dest: 'uploads/'});
  const google_vision = require('@google-cloud/vision');
  const client = new google_vision.ImageAnnotatorClient({
  keyFilename: '/home/ghjeong12/cdesign/My First Project-74d726b9ea5d.json'});

  /* After uploading an image */
  app.post('/upload', upload.single('image'), function(req, res, next) {
    //console.log(req.body.level);
     // Choose what the Vision API should detect
     // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var types = ['labels'];
  client.textDetection(req.file.path).then(
    results => {
    const detections = results[0].textAnnotations;
    }).catch(
      err => {
      console.error('ERROR:', err);
      }
    );

  /* Get documentTextDetection result */
  client.documentTextDetection(req.file.path).then(
    results => {
      const fullTextAnnotation = results[0].fullTextAnnotation;
      var result = fullTextAnnotation.text;
      // The last line is dummy line
      if(result[result.length-1]=='\n')
        result = result.slice(0,result.length-1);
      var happycalculator = require('happycalculator');
      var formula = '20 * ( 10 + 20 ) / 20';
      var result_lines = result.split("\n");
      var total_ins=[];
      var calc_result;
      if(result_lines.length == 1)
      {
        formula = fullTextAnnotation.text;
        // There is no : in blocks
        formula = formula.replace(/:/g,"\/");
        formula = formula.replace(/x/g,"*");
        console.log("[Calculation mode] " + formula);
        switch(result[0])
        {
        case '0' :
        case '1' :
        case '2' :
        case '3' :
        case '4' :
        case '5' :
        case '6' :
        case '7' :
        case '8' :
        case '9' :
        case '10' :
        case '\(' :
        case '-' :
          calc_result = happycalculator.calculate(formula);
          break;
        default:
          formula="";
          break;
      }
    }
    if(result_lines.length >= 2)
    {
      calc_result="";
      formula="";
      var ins;
      for(var i = 0; i < result_lines.length ; i ++)
      {
        ins = result_lines[i].split(" ");
        total_ins.push(ins);
      }
      console.log("# of lines : "+ result_lines.length);
      for(var i = 0; i < result_lines.length;i++)
      {
        console.log("#"+i+" "+ result_lines[i]);
      }
    }
    res.render('index',
      {
        formula : formula,
        result : fullTextAnnotation.text,
        num_lines : result_lines.length,
        total_ins : total_ins,
        calcul_result : calc_result,
        maze_level : req.body.level
      });


  })
  .catch(err => {
    console.error('ERROR:', err);
    });
  });

/* capture is not used */
app.get('/capture', function(req,res){
    //저장할 디렉터리가 없으면 생성

    //var cheerio = require('cheerio');
    //var web_client = require('cheerio-httpcli');
    //var request = require('request');
    //var urlType = require('url');
    //
    //  //URL 지정
    //var url = "http://119.202.81.78:3000/img";
    //var url = 'https://ko.wikipedia.org/wiki/' + encodeURIComponent('강아지');
    //var param = {};
    //var fname;
    //
    //  //html 파일 획득
    //var check_fst = 0;
    //var exec = require('child_process').exec;
    /*exec('rm ./uploads/camera.jpg',
        function (error, stdout, stderr) {
                  console.log('stdout: ' + stdout);
                          console.log('stderr: ' + stderr);
                                  if (error !== null) {
                                                 console.log('exec error: ' + error);
                                                         }
                                                             });
    */
    //request(url, function(err, req, body){

      console.log("do");
      //var sleep=require('sleep');
      //sleep.sleep(2);

      client.documentTextDetection("./uploads/camera.jpg").then(
      results => {
        const fullTextAnnotation = results[0].fullTextAnnotation;
        var result;
      if(fullTextAnnotation == null)
        result = fullTextAnnotation.text;
      else
        result = "";
      console.log("result : ");
      console.log(result);
      // The last line is dummy line
      if(result[result.length-1]=='\n')
        result = result.slice(0,result.length-1);
      var happycalculator = require('happycalculator');
      var formula = '20 * ( 10 + 20 ) / 20';
      var result_lines = result.split("\n");
      var total_ins=[];
      var calc_result;
      if(result_lines.length == 1)
      {
        formula = fullTextAnnotation.text;
        // There is no : in blocks
        formula = formula.replace(/:/g,"\/");
        formula = formula.replace(/x/g,"*");
        console.log("[Calculation mode] " + formula);
        switch(result[0])
        {
        case '0' :
        case '1' :
        case '2' :
        case '3' :
        case '4' :
        case '5' :
        case '6' :
        case '7' :
        case '8' :
        case '9' :
        case '10' :
        case '\(' :
        case '-' :
          calc_result = happycalculator.calculate(formula);
          break;
        default:
          formula="";
          break;
      }
    }
    if(result_lines.length >= 2)
    {
      calc_result="";
      formula="";
//      formula = formula.replace(/1/g,"");
      var ins;
      for(var i = 0; i < result_lines.length ; i ++)
      {
        // Instruction is not allowed to have 1
        console.log(result_lines[i]);
        ins = result_lines[i].split(" ");
        total_ins.push(ins);
      }
      console.log("# of lines : "+ result_lines.length);
      for(var i = 0; i < result_lines.length;i++)
      {
        console.log("#"+i+" "+ result_lines[i]);
      }
    }
    res.render('index',
      {
        formula : formula,
        result : fullTextAnnotation.text,
        num_lines : result_lines.length,
        total_ins : total_ins,
        calcul_result : calc_result,
        maze_level : req.body.level
      });


    })
  .catch(err => {
    console.error('ERROR:', err);
    });

    //});


  }); /* end of capture */
  /* After uploading an image */
  app.get('/autoupload', function(req, res) {
    //console.log(req.body.level);
     // Choose what the Vision API should detect
     // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts
  var types = ['labels'];
  //req.file.path = "./uploads/camera.jpg";
  client.textDetection("./uploads/camera.jpg").then(
    results => {
    const detections = results[0].textAnnotations;
    }).catch(
      err => {
      console.error('ERROR:', err);
      }
    );

  /* Get documentTextDetection result */
  client.documentTextDetection("./uploads/camera.jpg").then(
    results => {
      const fullTextAnnotation = results[0].fullTextAnnotation;
      var result;
      if(fullTextAnnotation == null)
      {
        result = "CAMERA IS DOWN";
      }
      else
        result = fullTextAnnotation.text;
      // The last line is dummy line
      if(result[result.length-1]=='\n')
        result = result.slice(0,result.length-1);
      var happycalculator = require('happycalculator');
      var formula = '20 * ( 10 + 20 ) / 20';
      var result_lines = result.split("\n");
      var total_ins=[];
      var calc_result;
      if(result_lines.length == 1)
      {
        formula = result;
        // There is no : in blocks
        formula = formula.replace(/:/g,"\/");
        formula = formula.replace(/x/g,"*");
        console.log("[ONE INSTRUCTION] " + formula);
        switch(result[0])
        {
        case '0' :
        case '1' :
        case '2' :
        case '3' :
        case '4' :
        case '5' :
        case '6' :
        case '7' :
        case '8' :
        case '9' :
        case '10' :
        case '\(' :
        case '-' :
          calc_result = happycalculator.calculate(formula);
          break;
        default:
          formula="";
          break;
      }
    }
    if(result_lines.length >= 2)
    {
      calc_result="";
      formula="";
      var ins;
      for(var i = 0; i < result_lines.length ; i ++)
      {
        result_lines[i] = result_lines[i].replace(/1/g,'');
        result_lines[i] = result_lines[i].replace(/\[/g,'');
        result_lines[i] = result_lines[i].replace(/\]/g,'');
        ins = result_lines[i].split(" ");
        total_ins.push(ins);
      }
      console.log("# of lines : "+ result_lines.length);
      for(var i = 0; i < result_lines.length;i++)
      {
        console.log("#"+i+" "+ result_lines[i]);
      }
    }
    res.render('index',
      {
        formula : formula,
        result : result,
        num_lines : result_lines.length,
        total_ins : total_ins,
        calcul_result : calc_result,
        maze_level : req.body.level
      });


  })
  .catch(err => {
    console.error('ERROR:', err);
    });
  });


 }

