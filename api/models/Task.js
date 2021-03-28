const mongoose = require('mongoose');
const { Schema } = mongoose;
const { model } = mongoose;
 
const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'Status'
    }
});

module.exports = model('Task', schema);
