const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const BASE_URL ="https://nitd-hostel-management-system.onrender.com";
const mongoDb = require("./db");
mongoDb();
const cors = require("cors");

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors());
app.use(express.json());
app.use('/api', require("./Routes/CreateAdmin"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})