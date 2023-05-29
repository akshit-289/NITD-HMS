const express = require('express');
const router = express.Router();
const admin = require('../models/Admin');
const dhauladhar = require('../models/Hostel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "ellomynameisakshitaggarwalandia";
const hostelName = require('../models/HostelName');
const mongodb = require('../db.js');

router.post("/createadmin", 
   // validation
   body('email', 'incorrect email').isEmail(),
   body('password', 'incorrect password').isLength({min: 5}), 
   async (req, res) => {

   const error =  validationResult(req);
   if(!error.isEmpty()){
      return res.status(400).json({ errors: error.array() });
   }  
   
   const salt = await bcrypt.genSalt(10);
   const secPassword = await bcrypt.hash(req.body.password, salt);
   try {
      await admin.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        designation: req.body.designation
      })
      res.json({success: true});
   } catch (error) {
      console.log(error);
      res.json({success:false});
   }
})

router.post("/loginadmin", async (req, res) => {
   let email = req.body.email;   
   try {
      // the findOne function returns the entire data if it matches else returns an empty array
      let adminData = await admin.findOne({email});
      if (!adminData) {
         return res.status(400).json({ errors: "Try logging with correct email" })
      }
      const pwdCompare = bcrypt.compare(req.body.password, adminData.password);
      if (!pwdCompare) {
         return res.status(400).json({ errors: "Try logging with correct password" })
      }
      const data = {
         admin:{
           id: adminData.id
         }
      }
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
   } catch (error) {
     console.log(error);
   }
})

router.get("/dhauladhar", async(req, res)=>{
   try {
      res.send(global.dhauladhar);
   } catch (error) {
      console.log(error);
      res.send("server error");
   }
})

// router.post("/add", async(req, res)=>{
//    dhauladhar.findByIdAndUpdate(userId, { $push: { [`floors.${0}.${0}`]: req.body.name } }, (err, matrix) => {
//       if (err) {
//          console.error(err);
//       } else {
//          console.log(matrix);
//          return res.status(400).json({success: true});              
//       }
//    });
// })

router.post("/hostelname", async (req, res) => {
   try {
      await hostelName.create({
         name: req.body.name,
         img: req.body.img,
      })
      res.json({ success: true });
   } catch (error) {
      console.log(error);
      res.json({ success: false });
   }
})
// console.log(global.dhauladhar);
router.post("/addfloor", async (req, res) => {
   try {
      const floorno = global.dhauladhar.length+1;
      await dhauladhar.create({
         floor:floorno, rooms:[]
      })
      res.json({ success: true });
      mongodb();
   } catch (error) {
      console.log(error);
      res.json({ success: false });
   }
})

router.post("/addroom/:fl", async (req, res) => {
   try {
      const floor = req.params.fl - 1;
      const id = global.dhauladhar[floor]._id;
      const floorSize = global.dhauladhar[floor].rooms.length;
      const roomNum = 100*(req.params.fl) + floorSize + 1;
      await dhauladhar.updateOne({_id: id}, {$push: {
            rooms : { roomno: roomNum, students: [] }
      }})
      res.json({ success: true });
      mongodb();
   } catch (error) {
      console.log(error);
      res.json({ success: false });
   }
})

router.post("/updfloor/:fl/:ro", async (req, res) => {
   try {
      const floor = req.params.fl-1;
      const id = global.dhauladhar[floor]._id;
      const room = (req.params.ro)%100-1;
      const path = `rooms.${room}.students`
      await dhauladhar.updateOne({_id: id}, {$push:{
              [path] : {name: req.body.name, rollno: req.body.rollno}
      }})                
      mongodb();                                
      res.json({ success: true });
   } catch (error) {
      console.log(error);
      res.json({ success: false });
   }
})

router.post("/delStudent/:fl/:ro/:studId", async (req, res) => {
   try {
      const floor = req.params.fl;
      const id = global.dhauladhar[floor]._id;
      const room = req.params.ro;
      const path = `rooms.${room}.students`;
      const studId = req.params.studId;
      await dhauladhar.updateOne({_id: id}, {$pull: {
          [path] : {_id: studId}
      }},{new: true})
      mongodb();
      res.json({ success: true });
   } catch (error) {
      console.log(error);
      res.json({ success: false });
   }
})

router.post("/updStudent/:fl/:ro/:studId", async (req, res) => {
   try {
      const floor = req.params.fl;
      const id = global.dhauladhar[floor]._id;
      const room = req.params.ro;
      const path = `rooms.${room}.students`;
      const studId = req.params.studId;
      await dhauladhar.updateOne({ _id: id }, {
         $pull: {
            [path]: { _id: studId }
         },
      }, { new: true })
      await dhauladhar.updateOne({ _id: id }, {
         $push: {
            [path]: { name: req.body.name, rollno: req.body.rollno }
         }
      })
      mongodb();
      res.json({ success: true });
   } catch (error) {
      console.log(error);
      res.json({ success: false });
   }
})

module.exports =  router;