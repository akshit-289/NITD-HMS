const mongoose = require('mongoose')

const { Schema } = mongoose;
// this is schema not model
const AdminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    }
})

// now, model created from schema and exported
module.exports = mongoose.model('admin', AdminSchema);