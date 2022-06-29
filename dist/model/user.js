"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, email, username, password) {
        this._id = 0;
        this._role = 0;
        this._albums = [];
        this._name = name;
        this._email = email;
        this._username = username;
        this._password = password;
    }
    set role(value) {
        this._role = value;
    }
    get role() {
        return this._role;
    }
    set id(value) {
        this._id = value;
    }
    get id() {
        return this._id;
    }
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    set email(value) {
        this._email = value;
    }
    get email() {
        return this._email;
    }
    set username(value) {
        this._username = value;
    }
    get username() {
        return this._username;
    }
    set password(value) {
        this._password = value;
    }
    get password() {
        return this._password;
    }
    set albums(value) {
        this._albums = value;
    }
    get albums() {
        return this._albums;
    }
}
exports.User = User;
