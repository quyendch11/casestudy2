"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Albums = void 0;
class Albums {
    constructor(name) {
        this._id = 0;
        this._song = [];
        this._user = null;
        this._name = name;
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
    set song(value) {
        this._song = value;
    }
    get song() {
        return this._song;
    }
    set user(value) {
        this._user = value;
    }
    get user() {
        return this._user;
    }
}
exports.Albums = Albums;
