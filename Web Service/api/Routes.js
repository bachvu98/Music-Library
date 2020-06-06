module.exports = function(app) {
    var MusicAPI = require('./Controller');

    app.route('/songs')
        .get(MusicAPI.list_all_songs)
        .post(MusicAPI.create_a_song);


    app.route('/songs/:songId')
        .get(MusicAPI.read_a_song)
        .put(MusicAPI.update_a_song)
        .delete(MusicAPI.delete_a_song);

    app.route('/genre/:genre')
        .get(MusicAPI.get_by_genre)

    app.route('/gbpm/:bpm')
        .get(MusicAPI.bpm_greater_than)

    app.route('/albums')
        .get(MusicAPI.list_all_albums)
        .post(MusicAPI.create_a_album);


    app.route('/albums/:albumId')
        .get(MusicAPI.read_a_album)
        .put(MusicAPI.update_a_album)
        .delete(MusicAPI.delete_a_album)


    app.route('/album/:albumId')
        .get(MusicAPI.list_all_songs_in_album)
        .post(MusicAPI.insert_to_album)
};