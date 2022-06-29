import {Song} from '../model/song'
import { SongManagement } from '../management/songmanagement'
import * as rl from 'readline-sync'
import { AlbumsManagement } from '../management/albumManagement';
import { User } from '../model/user';

enum SongChoise {
    SHOW_ALL_SONG = 1,
    ADD_SONG_TOALBUM=2,
    DELETE_SONGINALBUM = 3
}

export class UserSongMenu{
    private songmanagement = new SongManagement();
    private albummanagement = new AlbumsManagement();
    run(currentUser: User){
        let choice = -1;
        do{
            console.log('----Quản lý bài hát---')
            console.log('1. Hiển thị tất cả bài hát')
            console.log('2. Thêm bài hát vào album')
            console.log('3. Xoá bài hát trong album')
            console.log('0.Thoat')
            choice = +rl.question('Mời nhập lựa chọn:  ')
            switch (choice) {
                case SongChoise.SHOW_ALL_SONG:{
                    console.log('-----Tât cả bài hát hiện có-----')
                    this.showAllSong();
                    break;
                }
                case SongChoise.ADD_SONG_TOALBUM:{
                    console.log('-----Thêm bài hát vào album-----')
                    this.addSongtoAlbum(currentUser)
                    break;
                }
                case SongChoise.DELETE_SONGINALBUM:{
                    console.log('------Xoá bài hát trong album-----')
                    this.deleteSongfromAlbum();
                    break;
                }
            }
        }while(choice != 0)
    }

    showAllSong(){
        console.log('-----Danh sách bài hát------')
        let songs = this.songmanagement.getAll();
        for (let i = 0; i < songs.length; i++) {
            console.log(`Id: ${songs[i].id},Tên bài hát: ${songs[i].name}\t Ca sĩ trình bày: ${songs[i].singer}\t Nhạc sĩ: ${songs[i].writer}\t Thể loại: ${songs[i].type}\t Ngày phát hành: ${songs[i].debuttime}`)
        }
    }

    addSongtoAlbum(currentUser: User){
        console.log('-----Thêm bài hát vào album------')
        let songs = this.songmanagement.getAll();
        let albums = this.albummanagement.getAll();
        if(albums.length == 0){
            console.log('-----Hiện chưa có album nào-----')
            return ;
        }
        for (let i = 0; i < currentUser.albums.length; i++) {
            console.log(`ID: ${i+1},Tên album: ${currentUser.albums[i].name}\t `)
        }
        let id = +rl.question('Nhập mã ID bài hát muốn thêm vào album:  ');
        let songindex = this.songmanagement.findById(id);
        if (songindex == -1) {
            console.log('ID bài hát không tồn tại!');
            return;
        } else {
            let albumname = rl.question('Nhập tên album cần thêm: ');
            let album = this.albummanagement.findByName(albumname);
            if (album) {
                songs[songindex].albums = album
                album.song.push(songs[songindex]);
            }else {
                console.log('-----Tên album không tồn tại!-----');
            }
            return;
        }
    }

    deleteSongfromAlbum(){
        let albumname = rl.question('Nhập tên album muốn xoá bài hát:   ')
        let album = this.albummanagement.findByName(albumname);
        if(album){
            let songname = rl.question(' Nhập tên bài hát muốn xoá khỏi album:  ')
            for (let i = 0; i <album.song.length; i++){
                if(songname == album.song[i].name){
                    album.song.splice(i, 1);
                } else {
                    console.log('-----Bài hát không có trong album-----')
                }
            }
        }
    }
    
}