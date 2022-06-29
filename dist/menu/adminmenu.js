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
exports.AdminMenu = void 0;
const rl = __importStar(require("readline-sync"));
const songmenu_1 = require("./songmenu");
const albummenu_1 = require("./albummenu");
const usermenu_1 = require("./usermenu");
var AdminChoice;
(function (AdminChoice) {
    AdminChoice[AdminChoice["SONG_MANAGEMENT"] = 1] = "SONG_MANAGEMENT";
    AdminChoice[AdminChoice["ALBUM_MANAGEMENT"] = 2] = "ALBUM_MANAGEMENT";
    AdminChoice[AdminChoice["USER_MANAGEMENT"] = 3] = "USER_MANAGEMENT";
})(AdminChoice || (AdminChoice = {}));
class AdminMenu {
    constructor() {
        this.song = new songmenu_1.SongMenu();
        this.album = new albummenu_1.AlbumMenu();
        this.user = new usermenu_1.UserMenu();
    }
    run() {
        let choice = -1;
        do {
            console.log('---Ứng dụng quản lý WEB NHAC---');
            console.log('1. Quản lý bai hat');
            console.log('2. Quản lý album nhac');
            console.log('3. quan ly ng dung');
            console.log('0. Đăng xuất');
            choice = +rl.question('Nhập lựa chọn:  ');
            switch (choice) {
                case AdminChoice.SONG_MANAGEMENT: {
                    console.log('---quan ly bai hat----');
                    this.song.run();
                    break;
                }
                case AdminChoice.ALBUM_MANAGEMENT: {
                    console.log('---Quản lý album---');
                    this.album.run();
                    break;
                }
                case AdminChoice.USER_MANAGEMENT: {
                    console.log('---quan ly nguoi dung-----');
                    this.user.run();
                    break;
                }
            }
        } while (choice != 0);
    }
}
exports.AdminMenu = AdminMenu;
