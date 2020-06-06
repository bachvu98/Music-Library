

var mongoose = require('mongoose'),
    Song = mongoose.model('song');
    Album = mongoose.model('album');
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;

exports.list_all_songs = function(req, res) {
    Song.find({}, function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};

exports.create_a_song = function(req, res) {
    var new_song = new Song(req.body);
    new_song.save(function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};


exports.read_a_song = function(req, res) {
    Song.findById(req.params.songId, function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};


exports.update_a_song = function(req, res) {
    Song.findOneAndUpdate({_id: req.params.songId}, req.body, {new: true}, function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};


exports.delete_a_song = function(req, res) {
    Song.remove({
        _id: req.params.songId
    }, function(err, song) {
        if (err)
            res.send(err);
        res.json({ message: 'Song successfully deleted' });
    });
};

exports.get_by_genre = function(req, res) {
    let chosenGenre = req.params.genre;
    Song.find({"genre":chosenGenre}, function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};

exports.bpm_greater_than = function(req, res) {
    let bpm = req.params.bpm;
    Song.find({"bpm":{$gt:bpm}}, function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};

exports.list_all_albums = function(req, res) {
    Album.find({}, function(err, album) {
        if (err)
            res.send(err)
        res.json(album);
    });
};

exports.create_a_album = function(req, res) {
    var new_album = new Album(req.body);
    new_album.save(function(err, album) {
        if (err)
            res.send(err);
        res.json(album);
    });
};


exports.read_a_album = function(req, res) {
    Album.findById(req.params.albumId, function(err, album) {
        if (err)
            res.send(err);
        res.json(album);
    });
};


exports.update_a_album = function(req, res) {
    Album.findOneAndUpdate({_id: req.params.albumId}, req.body, {new: true}, function(err, album) {
        if (err)
            res.send(err);
        res.json(album);
    });
};


exports.delete_a_album = function(req, res) {
    Album.remove({
        _id: req.params.albumId
    }, function(err, album) {
        if (err)
            res.send(err);
        res.json({ message: 'Album successfully deleted' });
    });
};

exports.list_all_songs_in_album = function(req, res) {
    Album.findById(req.params.albumId, function (err, album) {
        if (err)
            res.send(err);
        Song.find({'_id': {$in: album.song}}, function(err, song) {
                if (err)
                    res.send(err)
                res.json(song)
            })
        })
    };

exports.insert_to_album = function(req, res) {
    var new_song = new Song(req.body);
    new_song.save(function(err, song) {
        if (err)
            res.send(err);
        res.json(song);
    });
};
