"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
class Song {
    constructor(name, singer, writer, type, debuttime) {
        this._id = 0;
        this._albums = null;
        this._name = name;
        this._singer = singer;
        this._writer = writer;
        this._type = type;
        this._debuttime = debuttime;
    }
    set id(value) {
        this._id = value;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    set type(value) {
        this._type = value;
    }
    get type() {
        return this._type;
    }
    set singer(value) {
        this._singer = value;
    }
    get singer() {
        return this._singer;
    }
    set writer(value) {
        this._writer = value;
    }
    get writer() {
        return this._writer;
    }
    set debuttime(value) {
        this._debuttime = value;
    }
    get debuttime() {
        return this._debuttime;
    }
    set albums(value) {
        this._albums = value;
    }
    get albums() {
        return this._albums;
    }
}
exports.Song = Song;
