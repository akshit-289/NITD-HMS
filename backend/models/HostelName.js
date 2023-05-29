const mongoose = require('mongoose')

const { Schema } = mongoose;
// this is schema not model
const HostelNameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
})

// now, model created from schema and exported
module.exports = mongoose.model('hostelName', HostelNameSchema);