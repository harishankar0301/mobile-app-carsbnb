module.exports = function (app) {



    var { QueryTypes, or } = require("sequelize");
    var Buffer = require('safe-buffer').Buffer
    var multer = require("multer");
    var path = require("path");
    var fs = require("fs");

    var bodyParser = require("body-parser");
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(
        bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
        })
    );

    //CORS setttings
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        );
        next();
    });

    app.get("/api/list/:loadCount", function (req, res) {
        orm.query(`select * from cars c left join car_images cimg on c.uid=cimg.car_uid order by dateAdded DESC limit ${req.params.loadCount}`, { type: QueryTypes.SELECT }).then(
            function (op) {
                res.send({ resp: op });
            }
        )


        //TRY>>>>>>
        // select c.*,CONCAT('[',GROUP_CONCAT(f.feature),']') as features from cars c left join features f
        // on c.uid=f.uid where c.uid='46b778f6-08cf-4283-925c-016bd65c08a3'
        // GROUP by c.uid;
    })

    app.get("/api/specificCar/:id", function (req, res) {
        orm.query(`select * from cars c left join car_images cimg on c.uid=cimg.car_uid left join features on c.uid=features.uid where c.uid = ?`, {
            type: QueryTypes.SELECT,
            replacements: [req.params.id]
        }).then(
            function (features) {
                console.log(features);
                let cardetails = features[0];
                cardetails["features"] = [];
                //Converting sql join ofoutput to array JSON of features of car
                for (let i = 0; i < features.length; i++) {
                    cardetails.features.push(features[i].feature);

                }
                //console.log(cardetails);
                res.send({ resp: cardetails });
            }
        )

        //  orm.query(`select uid,CONCAT('[', GROUP_CONCAT(feature), ']') as features from features GROUP by uid`, {
        //     type: QueryTypes.SELECT,
        // }).then(
        //     function (op) {
        //        console.log(op);
        //         res.send({ resp: op[0] });
        //     }
        // )

    })

    app.post("/api/book", function (req, res) {
        let email = req.body.email;
        let uid = req.body.uid;

        orm.query(`update cars set isrented=1 where uid='${uid}' `);
        orm.query(`insert into rented (uid,email) values ('${uid}','${email}')`);
        res.send({ resp: "SUCCESS" });
    })

    app.post("/api/return", function (req, res) {
        let email = req.body.email;
        let uid = req.body.uid;

        orm.query(`update cars set isrented=0 where uid='${uid}' `);
        orm.query(`delete from rented where uid='${uid}'`);
        res.send({ resp: "SUCCESS" });
    })


    app.get("/api/owned", function (req, res) {
        let email = req.body.email;
        orm.query(`select * from cars where email='${email}'`).then(
            function (op) {
                console.log(op);
                res.send({ resp: op });
            }
        )
    })

    app.get("/api/rented/:email", function (req, res) {
        let email = req.params.email;
        orm.query(`select * from cars left join rented on cars.uid=rented.uid where rented.email='${email}'`, { type: QueryTypes.SELECT }).then(
            function (op) {
                console.log(op);
                res.send({ resp: op });
            }
        )
    })
}