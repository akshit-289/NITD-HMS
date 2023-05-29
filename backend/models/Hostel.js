const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema({
    name: String,
    rollno: Number
})

const RoomSchema = new Schema({
    roomno: Number,
    students: [StudentSchema]
});

const FloorSchema = new Schema({
    floor: Number,
    rooms: [RoomSchema]
})


module.exports = mongoose.model('dhauldhar', FloorSchema);