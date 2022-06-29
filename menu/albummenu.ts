import * as rl from 'readline-sync'
import { Albums } from '../model/album'
import { AlbumsManagement } from '../management/albumManagement'
import { SongMenu } from './songmenu';
import { SongManagement } from '../management/songmanagement';
import { UserManagement } from '../management/usermanagement';

enum albumchoice {
    SHOW_ALL_ALBUM = 1,
    ADD_NEW_ALBUM = 2,
    UPDATE_ALBUM= 3,
    DELETE_ALBUM = 4,
    SHOW_SONGIN_ALBUM = 5,
    ADD_ALBUMTO_USER = 6
}

export class AlbumMenu{
    private albummanagement = new AlbumsManagement();
    private usermanagement = new UserManagement();

    run(){
        let choice = -1;
        do{
            console.log('----Quản lý album----')
            console.log('1. Hiển thị tất cả albums')
            console.log('2. Thêm album mới')
            console.log('3. Chỉnh sửa album')
            console.log('4. Xoá album')
            console.log('5. Hiển thị bài hát của album')
            console.log('6. Thêm album cho người dùng')
            console.log('0. Thoát')
            choice = +rl.question('Nhập chọn:   ')
            switch(choice) {
                case albumchoice.SHOW_ALL_ALBUM:{
                    this.showAllAlbums()
                    break;
                }
                case albumchoice.ADD_NEW_ALBUM:{
                    this.showCreateAlbum()
                    break;
                }
                case albumchoice.UPDATE_ALBUM:{
                    this.updateAlbum()
                    break;
                }
                case albumchoice.DELETE_ALBUM:{
                    this.deleteAlbum()
                    break;
                }
                case albumchoice.SHOW_SONGIN_ALBUM:{
                    this.showSong()
                    break;
                }
                case albumchoice.ADD_ALBUMTO_USER:{
                    this.addAlbumtoUser()
                    break;
                }
            }
        }while(choice !=0)1
    }
    showAllAlbums() {
        console.log('---Danh sách album-----')
        let albums = this.albummanagement.getAll()
        for (let i = 0; i < albums.length; i++) {
            console.log(` ID :${i+1},Tên album: ${albums[i].name}\t `)
        }
    }
    addAlbum(){
        let name = rl.question('Nhập tên album:  ') 
        return new Albums(name)
    }
   
    showCreateAlbum(){
        console.log('----Thêm album nhạc------')
        let album= this.addAlbum();
        this.albummanagement.createNew(album)
    }
    updateAlbum(){
        console.log('------Chỉnh sửa album------')
        let id= +rl.question('Vui lòng nhập ID album muốn chỉnh sửa:  ')
        let album = this.addAlbum();
        this.albummanagement.updateById(id ,album)
    }
    deleteAlbum(){
        console.log('------Xoá album------')
        let id= +rl.question('Vui lòng nhập ID album muốn xoá:  ')
        let question= +rl.question('Bạn đã chắc chắn muốn xoá không (nhập 1 để xoá , nhập 2 để quay lại): ')
        if(question == 1){
            this.albummanagement.removeById(id);
        }else if(question == 2){
            return ;
        }    
    }
    showSong(){
        console.log('---Hiển thị danh sách bài hát---');
                    let name = rl.question('Nhập tên album cần tìm: ');
                    let album = this.albummanagement.findByName(name);
                    if (album) {
                        for (let i = 0; i < album.song.length; i++) {
                            console.log(`ID ${i+1},Tên bài hát: ${album.song[i].name}\t Ca sĩ trình bày :${album.song[i].singer}\t Nhạc sĩ sáng tác:${album.song[i].writer}\t Thể loại: ${album.song[i].type}\t Ngày phát hành:${album.song[i].debuttime}`);
                        }
                    } else {
                        console.log('-----Album không tồn tại!-----');
                    }
    }

    addAlbumtoUser(){
        console.log('-----Thêm album cho người dùng----')
        let albums = this.albummanagement.getAll();
        let users = this.usermanagement.getAll()
        if(users.length == 0){
            console.log('-----Chưa có người dùng-----')
            return ;
        }
        for (let i = 0; i < users.length; i++) {
            console.log(` ID ${users[i].id},Tên người dùng: ${users[i].name}\t Email:${users[i].email}\t Tài khoản:${users[i].username}\t Mật khẩu:${users[i].password} `)
        }
        let id = +rl.question('Nhập mã album cần thêm vào người dùng:  ');
        let albumindex = this.albummanagement.findById(id);
        if (albumindex == -1) {
            console.log('-----Mã album không tồn tại!-----');
            return;
        } else {
            let username = rl.question('Nhập tên người dùng cần thêm: ');
            let user = this.usermanagement.findByName(username);
            if (user) {
                albums[albumindex].user = user
                user.albums.push(albums[albumindex]);
            }else {
                console.log('-----Tên người dùng không tồn tại!-----');
            }
            return;
        }
    }

    
}