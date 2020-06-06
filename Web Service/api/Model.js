var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SongSchema = new Schema({
    title: {
        type: String,
        required: 'Please enter a song name'
    },
    artist: {
        type: String,
        default: 'Unknown'
    },
    release_date: {
        type: Date,
        default: Date.now()
    },
    label: {
        type: String,
        default:'Unknown'
    },
    genre:{
        type:String,
        default:'Unknown'
    },
    bpm:{
        type: Number,
        default: 0
    },
    price:{
        type:String,
        default: 'Unknown'
    }
});
var AlbumSchema = new Schema({
    song: [{type: Schema.ObjectId, ref: 'song'}]
    ,
    title:{
        type: String,
        default:'Unknown'
    },
    artist: {
        type: String,
        default:'Unknown'
    }
});


module.exports = mongoose.model('song', SongSchema);
module.exports = mongoose.model('album', AlbumSchema);