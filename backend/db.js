const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nithostels:nitdelhihostels@cluster0.pmev2wb.mongodb.net/nithostelsdata?retryWrites=true&w=majority';


const mongoDb = async () => {
    await mongoose.connect(mongoURI, {useNewUrlParser: true},async(err, result)=>{
        if(err)
          console.log(err);
        else{  
          console.log("connected successfully");
          const fetched_data = await mongoose.connection.db.collection("hostelnames")
          const dhauladhar = await mongoose.connection.db.collection("dhauldhars")
          fetched_data.find({}).toArray((err, data)=>{
            if(err)
              console.log(err);
            else 
              console.log(data);
          })
          dhauladhar.find({}).toArray((err, data) => {
            if (err)
              console.log(err);
            else{
              global.dhauladhar = data;
              // console.log(data);
            }
          }) 
        }
    });
}

module.exports = mongoDb;