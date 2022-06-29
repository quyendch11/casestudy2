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
exports.UserChoiceMenu = void 0;
const rl = __importStar(require("readline-sync"));
const usersongmenu_1 = require("./usersongmenu");
const useralbummenu_1 = require("./useralbummenu");
var UserChoice;
(function (UserChoice) {
    UserChoice[UserChoice["ALBUM_MANAGEMENT"] = 1] = "ALBUM_MANAGEMENT";
    UserChoice[UserChoice["SONG_MANAGEMENT"] = 2] = "SONG_MANAGEMENT";
})(UserChoice || (UserChoice = {}));
class UserChoiceMenu {
    constructor() {
        this.song = new usersongmenu_1.UserSongMenu();
        this.album = new useralbummenu_1.UserAlbumMenu();
    }
    run(currentUser) {
        let choice = -1;
        do {
            console.log('---nguoi dung---');
            console.log('1. album');
            console.log('2. bai hat ');
            console.log('0. Đăng xuất');
            choice = +rl.question('nhap lua chon ');
            switch (choice) {
                case UserChoice.ALBUM_MANAGEMENT: {
                    console.log('quan ly album');
                    this.album.run(currentUser);
                    break;
                }
                case UserChoice.SONG_MANAGEMENT: {
                    console.log('quan ly bai hat');
                    this.song.run(currentUser);
                    break;
                }
            }
        } while (choice != 0);
    }
}
exports.UserChoiceMenu = UserChoiceMenu;
