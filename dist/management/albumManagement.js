"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsManagement = void 0;
class AlbumsManagement {
    getAll() {
        return AlbumsManagement.albums;
    }
    createNew(t) {
        AlbumsManagement.id++;
        t.id = AlbumsManagement.id;
        AlbumsManagement.albums.push(t);
    }
    updateById(id, t) {
        let index = this.findById(id);
        if (index != -1) {
            t.id = AlbumsManagement.albums[index].id;
            t.song = AlbumsManagement.albums[index].song;
            AlbumsManagement.albums[index] = t;
        }
    }
    removeById(id) {
        let index = this.findById(id);
        if (index !== -1) {
            AlbumsManagement.albums.splice(index, 1);
        }
    }
    findById(id) {
        let index = -1;
        for (let i = 0; i < AlbumsManagement.albums.length; i++) {
            if (AlbumsManagement.albums[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    findByName(name) {
        let index = -1;
        for (let i = 0; i < AlbumsManagement.albums.length; i++) {
            if (AlbumsManagement.albums[i].name == name) {
                return AlbumsManagement.albums[i];
                break;
            }
        }
        return null;
    }
}
exports.AlbumsManagement = AlbumsManagement;
AlbumsManagement.albums = [];
AlbumsManagement.id = 0;
