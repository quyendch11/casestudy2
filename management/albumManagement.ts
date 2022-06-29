import { Albums } from "../model/album";
import { SongManagement } from "./songmanagement";
import {IAlbumsManagement}from "../interface/i-albumsmanagement"
export class AlbumsManagement implements IAlbumsManagement {
    private static albums: Albums[] = [];
    private static id : number = 0;
    getAll(): Albums[]{
        return AlbumsManagement.albums;
        
    }

    createNew(t: Albums): void{
        AlbumsManagement.id++;
        t.id= AlbumsManagement.id;
        AlbumsManagement.albums.push(t);
    }

    updateById(id: number, t: Albums): void{
        let index = this.findById(id);
        if(index != -1){
            AlbumsManagement.albums[index]=t;
        }

    }

    removeById(id: number): void{
        let index = this.findById(id);
        if(index !== -1){
            AlbumsManagement.albums.splice(index, 1);
        }

    }

    findById(id: number): number{
        let index = -1;
        for(let i = 0; i < AlbumsManagement.albums.length; i++) {
            if(AlbumsManagement.albums[i].id==id){
                index = i;
                break;
            }
        }
        return index;

    }
    findByName(name: string): Albums | null {
        let index = -1;
        for(let i = 0; i < AlbumsManagement.albums.length; i++) {
            if(AlbumsManagement.albums[i].name==name) {
            return AlbumsManagement.albums[i];
                break;
            }
        }
        return null;
    }

}