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
exports.LoginMenu = void 0;
const usermanagement_1 = require("../management/usermanagement");
const user_1 = require("../model/user");
const rl = __importStar(require("readline-sync"));
const adminmenu_1 = require("./adminmenu");
const role_1 = require("../model/role");
const userchoicemenu_1 = require("./userchoicemenu");
var LoginChoise;
(function (LoginChoise) {
    LoginChoise[LoginChoise["LOGIN"] = 1] = "LOGIN";
    LoginChoise[LoginChoise["REGISTER"] = 2] = "REGISTER";
})(LoginChoise || (LoginChoise = {}));
class LoginMenu {
    constructor() {
        this.usermanagement = new usermanagement_1.UserManagement();
        this.adminmenu = new adminmenu_1.AdminMenu();
        this.userchoicemenu = new userchoicemenu_1.UserChoiceMenu();
    }
    run() {
        let choice = -1;
        do {
            console.log("-----chao mung toi nhac cua tao-------");
            console.log("-----vui long dang nhap-----");
            console.log("1.dang nhap");
            console.log("2. dang ky");
            console.log("0. thoat");
            choice = +rl.question('chon de:   ');
            switch (choice) {
                case LoginChoise.LOGIN: {
                    this.loginform();
                    break;
                }
                case LoginChoise.REGISTER: {
                    this.registerform();
                    break;
                }
            }
        } while (choice != 0);
    }
    loginform() {
        let username = rl.question('nhap tai khoan:  ');
        let password = rl.question('nhap mat khau:  ');
        let currentUser = this.usermanagement.login(username, password);
        if (currentUser != null) {
            console.log('--dang nhap dc roi day---');
            if (currentUser.role == role_1.Role.ADMIN) {
                this.adminmenu.run();
            }
            else {
                this.userchoicemenu.run(currentUser);
            }
        }
        else {
            console.log('--T??i kho???n ho???c m???t kh???u kh??ng ????ng!--');
        }
    }
    registerform() {
        let user = this.inputUser();
        this.usermanagement.createNew(user);
        console.log('---????ng k?? th??nh c??ng!----');
    }
    inputUser() {
        let username = this.inputusername();
        let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(password);
        let name = rl.question('Nh???p h??? t??n:  ');
        let email = this.inputEmail();
        return new user_1.User(name, email, username, password);
    }
    inputEmail() {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('Nh???p email (abc@gmail.com):');
            let regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('---?????nh d???ng email kh??ng h???p l???!---');
            }
            else {
                isValidEmail = true;
                let currentUser = this.usermanagement.findByEmail(email);
                if (currentUser) {
                    console.log('---Email ???? t???n t???i---');
                    isValidEmail = false;
                }
                else {
                    isValidEmail = true;
                }
            }
        } while (!isValidEmail);
        return email;
    }
    inputusername() {
        let username = '';
        let isValidUsername = true;
        do {
            username = rl.question('Nhap tai khoan:  ');
            let currentUser = this.usermanagement.findByName(username);
            if (currentUser) {
                isValidUsername = false;
                console.log('----tai khoan co roi ma oi !----');
            }
            else {
                isValidUsername = true;
            }
        } while (!isValidUsername);
        return username;
    }
    inputPassword(regexForPassword) {
        let password = '';
        let isValidPassword = true;
        do {
            password = rl.question('Nh???p m???t kh???u (C?? 1 k?? t??? vi???t hoa, 1 vi???t th?????ng, 1 k?? t??? ?????c bi???t v?? 1 s???):  ');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('mat khau nh???p v??o ph???i c?? ??t nh???t 1 k?? t??? th?????ng 1 hoa 1 ?????c bi???t 1 s???!');
            }
            else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return password;
    }
    inputConfirmPassword(password) {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('one more time baby:   ');
            if (password != confirmPassword) {
                console.log('----sai roi cha----');
            }
        } while (password != confirmPassword);
    }
}
exports.LoginMenu = LoginMenu;
