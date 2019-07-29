const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        // unique: true,
        // lowercase: true,
    },
    tags: [
        {
            type:
                String
        }]

});

module.exports = mongoose.model('Tag', tagSchema);