import {Song} from '../model/song'
import { SongManagement } from '../management/songmanagement'
import * as rl from 'readline-sync'
import { AlbumsManagement } from '../management/albumManagement';

enum SongChoise {
    SHOW_ALL_SONG = 1,
    ADD_NEW_SONG = 2,
    UPDATE_SONG = 3,
    DELETE_SONG = 4,
    ADD_SONG_TOALBUM= 5
}

export class SongMenu{
    private songmanagement = new SongManagement();
    private albummanagement = new AlbumsManagement();
    run(){
        let choice = -1;
        do{
            console.log('----quan ly bai hat---')
            console.log('1. hien thi tat ca bai hat')
            console.log('2.them bai hat moi')
            console.log('3.sua bai hat')
            console.log('4.xoa bai hat')
            console.log('5. them bai hat vao album')
            console.log('0.thoat')
            choice = +rl.question('chon de  ')
            switch (choice) {
                case SongChoise.SHOW_ALL_SONG:{
                    this.showAllSong();
                    break;
                }
                case SongChoise.ADD_NEW_SONG:{
                    this.showCreateSong();
                    break;
                }
                case SongChoise.UPDATE_SONG:{
                    this.updateSong();
                    break;
                }
                case SongChoise.DELETE_SONG:{
                    this.deleteSong();
                    break;
                }
                case SongChoise.ADD_SONG_TOALBUM:{
                    this.addSongtoAlbum()
                    break;
                }
            }
        }while(choice != 0)
    }

    showAllSong(){
        console.log('danh sach nhac')
        let songs = this.songmanagement.getAll();
        for (let i = 0; i < songs.length; i++) {
            console.log(`${songs[i].id},ten bai hat: ${songs[i].name}\t ca sy trinh bay :${songs[i].singer}\t nhac si:${songs[i].writer}\t the loai: ${songs[i].type}\t ngay phat hanh:${songs[i].debuttime}`)
        }
    }

    addSong(){
        let name = rl.question('nhap ten bai hat  ')
        let singer = rl.question('nhap ten ca sy trinh bay  ')
        let writer = rl.question('nhap ten nhac sy sang tac  ')
        let type = rl.question('nhap the loai nhac  ')
        let debuttime= rl.question('nhap ngay phat hanh ')
        return new Song(name, singer, writer, type,debuttime);
    }
    showCreateSong(){
        console.log('them bai nhac buon nao')
        let song= this.addSong();
        this.songmanagement.createNew(song)
    }
    updateSong(){
        console.log('sua bai hat')
        let id = +rl.question('nhap id bai hat muon sua ')
        let song = this.addSong();
        this.songmanagement.updateById(id ,song)
    }
    deleteSong(){
        console.log('xoa bai hat')
        let id= +rl.question('nhap id bai hat muon xoa ')
        let question= +rl.question('hay chac muon xoa(nhap 1 de xoa 2 de thoi) ')
        if(question == 1){
            this.songmanagement.removeById(id);
        }else if(question == 2){
            return ;
        }    
    }

    addSongtoAlbum(){
        console.log('them bai hat vao album')
        let songs = this.songmanagement.getAll();
        let albums = this.albummanagement.getAll()
        if(albums.length == 0){
            console.log('chua co album')
            return ;
        }
        for (let i = 0; i < albums.length; i++) {
            console.log(`${i+1},ten album: ${albums[i].name}\t `)
        }
        let id = +rl.question('Nhập mã bai hat cần thêm vào album');
        let songindex = this.songmanagement.findById(id);
        if (songindex == -1) {
            console.log('Mã bai hat không tồn tại!');
            return;
        } else {
            let albumname = rl.question('Nhập tên album cần thêm:');
            let album = this.albummanagement.findByName(albumname);
            if (album) {
                songs[songindex].albums = album
                album.song.push(songs[songindex]);
            }else {
                console.log('Tên album không tồn tại!');
            }
            return;
        }
    }
    
}