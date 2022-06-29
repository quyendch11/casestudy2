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
            console.log('----Quản lý bài hát---')
            console.log('1. Hiển thị tất cả bài hát')
            console.log('2.Thêm bài hát mới')
            console.log('3.Chỉnh sửa bài hát')
            console.log('4.Xoá bài hát')
            console.log('5. Thêm bài hát vào album')
            console.log('0.Thoát')
            choice = +rl.question('Mời nhập lựa chọn:  ')
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
        console.log('-------Danh sách bài hát--------')
        let songs = this.songmanagement.getAll();
        for (let i = 0; i < songs.length; i++) {
            console.log(`ID :${songs[i].id},Tên bài hát: ${songs[i].name}\t Ca sĩ thể hiện:${songs[i].singer}\t Nhạc sĩ:${songs[i].writer}\t Thể loại: ${songs[i].type}\t Ngày phát hành:${songs[i].debuttime}`)
        }
    }

    addSong(){
        let name = rl.question('Nhập tên bài hát:  ')
        let singer = rl.question('Nhập tên ca sĩ trình bày:  ')
        let writer = rl.question('Nhập tên nhạc sĩ sáng tác:  ')
        let type = rl.question('Nhập thể loại nhạc:  ')
        let debuttime= rl.question('Nhập ngày phát hành:  ')
        return new Song(name, singer, writer, type,debuttime);
    }
    showCreateSong(){
        console.log('------Thêm bài hát--------')
        let song= this.addSong();
        this.songmanagement.createNew(song)
    }
    updateSong(){
        console.log('------Chỉnh sửa bài hát------')
        let id = +rl.question('Nhập ID bài hát muốn sửa:  ')
        let song = this.addSong();
        this.songmanagement.updateById(id ,song)
    }
    deleteSong(){
        console.log('------Xoá bài hát--------')
        let id= +rl.question('Nhập ID bài hát muốn xoá: ')
        let question= +rl.question('Bạn có chắc muốn xoá (nhập 1 để xoá , nhập 2 để huỷ bỏ): ')
        if(question == 1){
            this.songmanagement.removeById(id);
        }else if(question == 2){
            return ;
        }    
    }

    addSongtoAlbum(){
        console.log('------Thêm bài hát vào album-------')
        let songs = this.songmanagement.getAll();
        let albums = this.albummanagement.getAll()
        if(albums.length == 0){
            console.log('------Hiện tại chưa có album nào-------')
            return ;
        }
        for (let i = 0; i < albums.length; i++) {
            console.log(` ID: ${i+1}, Tên album: ${albums[i].name}\t `)
        }
        let id = +rl.question('Nhập ID bài hát cần thêm vào album:  ');
        let songindex = this.songmanagement.findById(id);
        if (songindex == -1) {
            console.log('------ID bài hát không tồn tại!------');
            return;
        } else {
            let albumname = rl.question('Nhập tên album cần thêm: ');
            let album = this.albummanagement.findByName(albumname);
            if (album) {
                songs[songindex].albums = album
                album.song.push(songs[songindex]);
            }else {
                console.log('------Tên album không tồn tại!------');
            }
            return;
        }
    }
    
}