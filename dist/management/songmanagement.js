"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongManagement = void 0;
class SongManagement {
    getAll() {
        return SongManagement.songs;
    }
    createNew(t) {
        SongManagement.id++;
        t.id = SongManagement.id;
        SongManagement.songs.push(t);
    }
    updateById(id, t) {
        let index = this.findById(id);
        if (index != -1) {
            SongManagement.songs[index] = t;
            t.id = id;
            console.log(' chinh sua thanh cong ');
        }
    }
    removeById(id) {
        let index = this.findById(id);
        if (index != -1) {
            SongManagement.songs.splice(index, 1);
        }
    }
    findById(id) {
        let index = -1;
        for (let i = 0; i < SongManagement.songs.length; i++) {
            if (SongManagement.songs[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findByName(name) {
        let index = -1;
        for (let i = 0; i < SongManagement.songs.length; i++) {
            if (SongManagement.songs[i].name == name) {
                return SongManagement.songs[i];
                break;
            }
        }
        return null;
    }
}
exports.SongManagement = SongManagement;
SongManagement.songs = [];
SongManagement.id = 0;
