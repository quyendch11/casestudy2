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
exports.AlbumMenu = void 0;
const rl = __importStar(require("readline-sync"));
const album_1 = require("../model/album");
const albumManagement_1 = require("../management/albumManagement");
const usermanagement_1 = require("../management/usermanagement");
var albumchoice;
(function (albumchoice) {
    albumchoice[albumchoice["SHOW_ALL_ALBUM"] = 1] = "SHOW_ALL_ALBUM";
    albumchoice[albumchoice["ADD_NEW_ALBUM"] = 2] = "ADD_NEW_ALBUM";
    albumchoice[albumchoice["UPDATE_ALBUM"] = 3] = "UPDATE_ALBUM";
    albumchoice[albumchoice["DELETE_ALBUM"] = 4] = "DELETE_ALBUM";
    albumchoice[albumchoice["SHOW_SONGIN_ALBUM"] = 5] = "SHOW_SONGIN_ALBUM";
    albumchoice[albumchoice["ADD_ALBUMTO_USER"] = 6] = "ADD_ALBUMTO_USER";
})(albumchoice || (albumchoice = {}));
class AlbumMenu {
    constructor() {
        this.albummanagement = new albumManagement_1.AlbumsManagement();
        this.usermanagement = new usermanagement_1.UserManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('----quan ly album----');
            console.log('1. hien thi tat ca albums');
            console.log('2. them album moi');
            console.log('3. sua album');
            console.log('4. xoa album');
            console.log('5. hien thi bai hat cua album');
            console.log('6. them album vao user');
            console.log('0. thoat');
            choice = +rl.question('chon de:   ');
            switch (choice) {
                case albumchoice.SHOW_ALL_ALBUM: {
                    this.showAllAlbums();
                    break;
                }
                case albumchoice.ADD_NEW_ALBUM: {
                    this.showCreateAlbum();
                    break;
                }
                case albumchoice.UPDATE_ALBUM: {
                    this.updateAlbum();
                    break;
                }
                case albumchoice.DELETE_ALBUM: {
                    this.deleteAlbum();
                    break;
                }
                case albumchoice.SHOW_SONGIN_ALBUM: {
                    this.showSong();
                    break;
                }
                case albumchoice.ADD_ALBUMTO_USER: {
                    this.addAlbumtoUser();
                    break;
                }
            }
        } while (choice != 0);
        1;
    }
    showAllAlbums() {
        console.log('danh sach album nhac');
        let albums = this.albummanagement.getAll();
        for (let i = 0; i < albums.length; i++) {
            console.log(`${i + 1},ten album: ${albums[i].name}\t `);
        }
    }
    addAlbum() {
        let name = rl.question('nhap ten album:  ');
        return new album_1.Albums(name);
    }
    showCreateAlbum() {
        console.log('them album nhac');
        let album = this.addAlbum();
        this.albummanagement.createNew(album);
    }
    updateAlbum() {
        console.log('sua album');
        let id = +rl.question('nhap id album muon sua:  ');
        let album = this.addAlbum();
        this.albummanagement.updateById(id, album);
    }
    deleteAlbum() {
        console.log('xoa album');
        let id = +rl.question('nhap id album muon xoa:  ');
        let question = +rl.question('hay chac muon xoa(nhap 1 de xoa 2 de thoi) ');
        if (question == 1) {
            this.albummanagement.removeById(id);
        }
        else if (question == 2) {
            return;
        }
    }
    showSong() {
        console.log('---Hiển thị danh sách bai hat---');
        let name = rl.question('Nhập tên album cần tìm: ');
        let album = this.albummanagement.findByName(name);
        if (album) {
            for (let i = 0; i < album.song.length; i++) {
                console.log(`${i + 1},ten bai hat: ${album.song[i].name}\t ca sy trinh bay :${album.song[i].singer}\t nhac si:${album.song[i].writer}\t the loai: ${album.song[i].type}\t ngay phat hanh:${album.song[i].debuttime}`);
            }
        }
        else {
            console.log('album không tồn tại!');
        }
    }
    addAlbumtoUser() {
        console.log('them album vao user');
        let albums = this.albummanagement.getAll();
        let users = this.usermanagement.getAll();
        if (users.length == 0) {
            console.log('chua co user');
            return;
        }
        for (let i = 0; i < users.length; i++) {
            console.log(`${users[i].id},ten user: ${users[i].name}\t email:${users[i].email}\t username:${users[i].username}\t password:${users[i].password} `);
        }
        let id = +rl.question('Nhập mã album cần thêm vào user:  ');
        let albumindex = this.albummanagement.findById(id);
        if (albumindex == -1) {
            console.log('Mã album không tồn tại!');
            return;
        }
        else {
            let username = rl.question('Nhập tên user cần thêm: ');
            let user = this.usermanagement.findByName(username);
            if (user) {
                albums[albumindex].user = user;
                user.albums.push(albums[albumindex]);
            }
            else {
                console.log('Tên user không tồn tại!');
            }
            return;
        }
    }
}
exports.AlbumMenu = AlbumMenu;
