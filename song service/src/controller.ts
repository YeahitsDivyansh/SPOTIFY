import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";

export const getAllAlbum = TryCatch(async (req, res) => {
    let albums;
    albums = await sql`SELECT * FROM albums`;
    res.json(albums);
});

export const getAllSongs = TryCatch(async (req, res) => {
    let songs;
    songs = await sql`SELECT * FROM songs`;
    res.json(songs);
});

export const getAllSongsOfAlbum = TryCatch(async (req, res) => {
    const { id } = req.params;
    let album, songs;
    album = await sql`SELECT * FROM albums WHERE id=${id}`;
    if (album.length === 0) {
        res.status(404).json({ message: "Album not found with this id" });
        return;
    }
    songs = await sql`SELECT * FROM songs WHERE album_id=${id}`;
    const response = { album: album[0], songs: songs };
    res.json(response);
});

export const getSingleSong = TryCatch(async (req, res) => {
    const song = await sql`SELECT * FROM songs WHERE id=${req.params.id}`;
    if (song.length === 0) {
        res.status(404).json({ message: "Song not found with this id" });
        return;
    }
    res.json(song[0]);
});
