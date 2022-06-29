"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSongMenu = void 0;
const songmanagement_1 = require("../management/songmanagement");
const rl = __importStar(require("readline-sync"));
const albumManagement_1 = require("../management/albumManagement");
var SongChoise;
(function (SongChoise) {
    SongChoise[SongChoise["SHOW_ALL_SONG"] = 1] = "SHOW_ALL_SONG";
    SongChoise[SongChoise["ADD_SONG_TOALBUM"] = 2] = "ADD_SONG_TOALBUM";
    SongChoise[SongChoise["DELETE_SONGINALBUM"] = 3] = "DELETE_SONGINALBUM";
})(SongChoise || (SongChoise = {}));
class UserSongMenu {
    constructor() {
        this.songmanagement = new songmanagement_1.SongManagement();
        this.albummanagement = new albumManagement_1.AlbumsManagement();
    }
    run(currentUser) {
        let choice = -1;
        do {
            console.log('----quan ly bai hat---');
            console.log('1. hien thi tat ca bai hat');
            console.log('2. them bai hat vao album');
            console.log('3. xoa bai hat trong album');
            console.log('0.thoat');
            choice = +rl.question('chon de');
            switch (choice) {
                case SongChoise.SHOW_ALL_SONG: {
                    console.log('ta ca bai hat cua web');
                    this.showAllSong();
                    break;
                }
                case SongChoise.ADD_SONG_TOALBUM: {
                    console.log('them bai hat vao album');
                    this.addSongtoAlbum(currentUser);
                    break;
                }
                case SongChoise.DELETE_SONGINALBUM: {
                    console.log('xoa bai hat trong album');
                    this.deleteSongfromAlbum();
                    break;
                }
            }
        } while (choice != 0);
    }
    showAllSong() {
        console.log('danh sach nhac');
        let songs = this.songmanagement.getAll();
        for (let i = 0; i < songs.length; i++) {
            console.log(`${songs[i].id},ten bai hat: ${songs[i].name}\t ca sy trinh bay :${songs[i].singer}\t nhac si:${songs[i].writer}\t the loai: ${songs[i].type}\t ngay phat hanh:${songs[i].debuttime}`);
        }
    }
    addSongtoAlbum(currentUser) {
        console.log('them bai hat vao album');
        let songs = this.songmanagement.getAll();
        let albums = this.albummanagement.getAll();
        if (albums.length == 0) {
            console.log('chua co album');
            return;
        }
        for (let i = 0; i < currentUser.albums.length; i++) {
            console.log(`${i + 1},ten album: ${currentUser.albums[i].name}\t `);
        }
        let id = +rl.question('Nhập mã bai hat cần thêm vào album');
        let songindex = this.songmanagement.findById(id);
        if (songindex == -1) {
            console.log('Mã bai hat không tồn tại!');
            return;
        }
        else {
            let albumname = rl.question('Nhập tên album cần thêm:');
            let album = this.albummanagement.findByName(albumname);
            if (album) {
                songs[songindex].albums = album;
                album.song.push(songs[songindex]);
            }
            else {
                console.log('Tên album không tồn tại!');
            }
            return;
        }
    }
    deleteSongfromAlbum() {
        let albumname = rl.question('nhap ten album muon xoa bai hat  ');
        let album = this.albummanagement.findByName(albumname);
        if (album) {
            let songname = rl.question(' nhap ten bai hat muon xoa khoi album');
            for (let i = 0; i < album.song.length; i++) {
                if (songname == album.song[i].name) {
                    album.song.splice(i, 1);
                }
                else {
                    console.log('bai hat khong co trong album');
                }
            }
        }
    }
}
exports.UserSongMenu = UserSongMenu;
