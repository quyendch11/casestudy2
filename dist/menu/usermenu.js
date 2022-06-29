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
exports.UserMenu = void 0;
const rl = __importStar(require("readline-sync"));
const user_1 = require("../model/user");
const usermanagement_1 = require("../management/usermanagement");
var userchoice;
(function (userchoice) {
    userchoice[userchoice["SHOW_ALL_USER"] = 1] = "SHOW_ALL_USER";
    userchoice[userchoice["ADD_NEW_USER"] = 2] = "ADD_NEW_USER";
    userchoice[userchoice["UPDATE_USER"] = 3] = "UPDATE_USER";
    userchoice[userchoice["DELETE_USER"] = 4] = "DELETE_USER";
    userchoice[userchoice["SHOW_ALBUM"] = 5] = "SHOW_ALBUM";
})(userchoice || (userchoice = {}));
class UserMenu {
    constructor() {
        this.usermanagement = new usermanagement_1.UserManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log('----quan ly USER----');
            console.log('1. hien thi tat ca user');
            console.log('2. them user moi');
            console.log('3. sua user');
            console.log('4. xoa user');
            console.log('5. hien thi album cua user');
            console.log('0. thoat');
            choice = +rl.question('chon de');
            switch (choice) {
                case userchoice.SHOW_ALL_USER: {
                    this.showAllUser();
                    break;
                }
                case userchoice.ADD_NEW_USER: {
                    this.showCreateUser();
                    break;
                }
                case userchoice.UPDATE_USER: {
                    this.updateUser();
                    break;
                }
                case userchoice.DELETE_USER: {
                    this.deleteUser();
                    break;
                }
                case userchoice.SHOW_ALBUM: {
                    this.showAlbum();
                    break;
                }
            }
        } while (choice != 0);
    }
    showAllUser() {
        console.log('danh sach user');
        let users = this.usermanagement.getAll();
        for (let user of users) {
            console.log(`${user.id},ten user: ${user.name}\t email:${user.email}\t username:${user.username}\t password:${user.password}`);
        }
    }
    addUser() {
        let name = rl.question('nhap ten user');
        let email = rl.question('nhap email');
        let username = rl.question('nhap username');
        let password = rl.question('nhap password');
        return new user_1.User(name, email, username, password);
    }
    showCreateUser() {
        console.log('them user');
        let user = this.addUser();
        this.usermanagement.createNew(user);
    }
    updateUser() {
        console.log('sua album');
        let id = +rl.question('nhap id user muon sua');
        let user = this.addUser();
        this.usermanagement.updateById(id, user);
    }
    deleteUser() {
        console.log('xoa user');
        let id = +rl.question('nhap id user muon xoa');
        let question = +rl.question('hay chac muon xoa(nhap 1 de xoa 2 de thoi) ');
        if (question == 1) {
            this.usermanagement.removeById(id);
        }
        else if (question == 2) {
            return;
        }
    }
    showAlbum() {
        console.log('---Hiển thị danh sách album---');
        let name = rl.question('Nhập tên user cần tìm:');
        let user = this.usermanagement.findByName(name);
        if (user) {
            for (let i = 0; i < user.albums.length; i++) {
                console.log(`${i + 1},ten album: ${user.albums[i].name}\t `);
            }
        }
        else {
            console.log('album không tồn tại!');
        }
    }
}
exports.UserMenu = UserMenu;
