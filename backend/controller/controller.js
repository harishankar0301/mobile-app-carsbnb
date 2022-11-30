module.exports = function (app) { 
const { v4: uuidv4 } = require('uuid');

  const uploadtoAzure = require('./azure/fileUpload');

  var { QueryTypes } = require("sequelize");
  var Buffer = require('safe-buffer').Buffer
  var multer = require("multer");
  var path = require("path");
  var fs = require("fs");

  const crypto = require("crypto");

  function calcSHA(str) {
  
  const secret = "This is a company secret";
  
  
  const sha256Hasher = crypto.createHmac("sha256", secret);
  
  return sha256Hasher.update(str).digest("hex");
  }
  
  
  //Using multer for disk Storage
  //{storage:storage}
  // const storage = multer.diskStorage({
  //   destination: (req, file, callBack) => {
  //     callBack(null, "./uploads/");
  //   },
  //   filename: (req, file, callBack) => {
  //     callBack(null, file.originalname);
  //   },
  // });

  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/multipleFiles/:mail", upload.array("files"), (req, res, next) => {
    //let email = req.params.mail;
    //console.log(email);
    const files = req.files;
    console.log(req);
    files.forEach(async (element) => {
      console.log(element.originalname);
      // db.update({
      //   image: fs.readFileSync(`./uploads/${element.originalname}`)
      // }, {
      //   where: {
      //     email: email
      //   }
      // })
    })

  });

  //Add new car API
  app.post("/api/newCar", upload.array("files"), function (req, res) {

    const files = req.files;
    const brand = req.body.carBrand;
    const rate = req.body.rate;
    const description = req.body.description;
    const email = req.body.email;
    const city = req.body.city;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    let uid = uuidv4();
    orm.query(`INSERT INTO cars (model,uid,isrented,owner,price,description,dateAdded,city) values('${brand}','${uid}',0,'${email}','${rate}','${description}',now()),'${city}'`,).catch((err) => {
       console.log(err);
       res.send({ resp: "ERROR" });
    });
    const featureList = JSON.parse(req.body.features)
    console.log(typeof(featureList))
    featureList.map((feature) => {
      orm.query(`INSERT INTO features (uid,feature) values('${uid}','${feature}')`).catch((err) => {
          console.log(err);
          res.send({ resp: "ERROR" });
      });
    })
    files.forEach(async (file) => {
      let fileuid=uuidv4();
      let type=file.originalname.split('.').pop();
      let newfilename=fileuid+'.'+type;
      console.log(newfilename)
      orm.query(`INSERT INTO car_images (car_uid,imageUri) values('${uid}','${newfilename}')`).catch((err) => {
          console.log(err);
          res.send({ resp: "ERROR" });
      });
      uploadtoAzure('cars-cont', file, newfilename);
      
    })

  });


  app.get("/api/view/:mail", function (req, res) {
    let email = req.params.mail;
    orm.query(`select image from users where email='${email}'`, { type: QueryTypes.SELECT }).then(function (op) {
      //console.log(op[0]['image'].toString('base64'));
      // res.send(op[0]['image']);
     
      // console.log(op[0]['image']);
      // let blob1 = new Blob(op[0]['image']).toString('base64');
      // console.log(blob1);
      // let respp = Buffer.from(op[0]['image'], 'binary').toString('base64');
      // console.log(respp);
      let buff = new Buffer(op[0]['image'], 'binary');
      let base64data = buff.toString('base64');
      res.send({ resp: base64data});
      // res.send(base64data);
    })
  })
  app.post('/api/loginv', function (req, res) {
    let email = req.body.email;
    let pwd = calcSHA(req.body.password);
    console.log(req.body);
    orm.query(`SELECT * FROM users where email='${email}'`, { type: QueryTypes.SELECT }).then(function (op) {
      console.log(op);
      if (op.length > 0) {
        let pwdRes = op[0]['password'];
        if (pwdRes == pwd) {
          res.send({ resp: "AUTHORIZED" });
        }
        else {
          res.send({ resp: "UNAUTHORIZED" });
        }

      }
      else {
        res.send({ resp: "UNAUTHORIZED" });
      }
    })

  })

  app.post('/api/signup', function (req, res) {
    let email = req.body.email;
    let name = req.body.name;
    let pwd = calcSHA(req.body.password);

    orm.query(`INSERT INTO users (email,name,password) values('${email}','${name}','${pwd}')`).catch((err) => {
      console.log(err);
      res.send({ resp: "ERROR" });
    });

    res.send({ resp: "SUCCESS" });


  });


  app.post('/api/reset', function (req, res) {
    let email = req.body.email;
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'example@gmail.com',
        pass: 'your password'
      }
    });

    var mailOptions = {
      from: 'example@gmail.com',
      to: email,
      subject: 'Forgot Password',
      text: 'Forgot Password'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })


}