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
exports.UserAlbumMenu = void 0;
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
})(albumchoice || (albumchoice = {}));
class UserAlbumMenu {
    constructor() {
        this.albummanagement = new albumManagement_1.AlbumsManagement();
        this.usermanagement = new usermanagement_1.UserManagement();
    }
    run(currentUser) {
        let choice = -1;
        do {
            console.log('----quan ly album----');
            console.log('1. hien thi tat ca albums');
            console.log('2. tao album moi');
            console.log('3. sua album');
            console.log('4. xoa album');
            console.log('5. hien thi bai hat cua album');
            console.log('0. thoat');
            choice = +rl.question('chon de  ');
            switch (choice) {
                case albumchoice.SHOW_ALL_ALBUM: {
                    console.log('tat ca album cua nguoi dung');
                    this.showAllAlbums(currentUser);
                    break;
                }
                case albumchoice.ADD_NEW_ALBUM: {
                    console.log('tao album moi');
                    this.showCreateAlbum(currentUser);
                    break;
                }
                case albumchoice.UPDATE_ALBUM: {
                    console.log(' sua album');
                    this.updateAlbum(currentUser);
                    break;
                }
                case albumchoice.DELETE_ALBUM: {
                    console.log(' xoa album');
                    this.deleteAlbum(currentUser);
                    break;
                }
                case albumchoice.SHOW_SONGIN_ALBUM: {
                    console.log('hien thi bai hat cua album');
                    this.showSong();
                    break;
                }
            }
        } while (choice != 0);
        1;
    }
    showAllAlbums(currentUser) {
        console.log('danh sach album nhac');
        let albums = currentUser.albums;
        for (let i = 0; i < albums.length; i++) {
            console.log(`${albums[i].id},ten album: ${albums[i].name}\t `);
        }
    }
    addAlbum() {
        let name = rl.question('nhap ten album  ');
        return new album_1.Albums(name);
    }
    showCreateAlbum(currentUser) {
        console.log('them album nhac ');
        let album = this.addAlbum();
        this.albummanagement.createNew(album);
        currentUser.albums.push(album);
    }
    updateAlbum(currentUser) {
        console.log('sua album');
        let id = +rl.question('nhap id album muon sua  ');
        let album = this.addAlbum();
        this.albummanagement.updateById(id, album);
        for (let i = 0; i < currentUser.albums.length; i++) {
            if (id == currentUser.albums[i].id) {
                currentUser.albums[i] = album;
            }
        }
    }
    deleteAlbum(currentUser) {
        console.log('xoa album');
        let id = +rl.question('nhap id album muon xoa  ');
        let question = +rl.question('hay chac muon xoa(nhap 1 de xoa 2 de thoi)  ');
        if (question == 1) {
            this.albummanagement.removeById(id);
            for (let i = 0; i < currentUser.albums.length; i++) {
                if (id == currentUser.albums[i].id) {
                    currentUser.albums.splice(i, 1);
                }
            }
        }
        else if (question == 2) {
            return;
        }
    }
    showSong() {
        console.log('---Hiển thị danh sách bai hat---');
        let name = rl.question('Nhập tên album cần tìm:  ');
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
}
exports.UserAlbumMenu = UserAlbumMenu;
