const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({

    tags: [
        {
            type:
                String
        }]

});

module.exports = mongoose.model('Tag', tagSchema);