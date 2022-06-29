import * as rl from 'readline-sync'
import { Albums } from '../model/album'
import { AlbumsManagement } from '../management/albumManagement'
import { SongMenu } from './songmenu';
import { SongManagement } from '../management/songmanagement';
import { UserManagement } from '../management/usermanagement';
import { User } from '../model/user';

enum albumchoice {
    SHOW_ALL_ALBUM = 1,
    ADD_NEW_ALBUM = 2,
    UPDATE_ALBUM= 3,
    DELETE_ALBUM = 4,
    SHOW_SONGIN_ALBUM = 5
   
}

export class UserAlbumMenu{
    private albummanagement = new AlbumsManagement();
    private usermanagement = new UserManagement();
    

    run(currentUser: User): void{
        let choice = -1;
        do{
            console.log('----Quản lý album----')
            console.log('1. Hiển thị tất cả  albums')
            console.log('2. Tạo album mới')
            console.log('3. Chỉnh sửa album')
            console.log('4. Xoá album')
            console.log('5.Hiển thị bài hát của album')
            console.log('0.Thoát')
            choice = +rl.question('Mời nhập lựa chọn:  ')
            switch(choice) {
                case albumchoice.SHOW_ALL_ALBUM:{
                    console.log('-----Tất cả album của người dùng------')
                    this.showAllAlbums(currentUser)
                    break;
                }
                case albumchoice.ADD_NEW_ALBUM:{
                    console.log('-----Tạo album mới-----')
                    this.showCreateAlbum(currentUser)
                    break;
                }
                case albumchoice.UPDATE_ALBUM:{
                    console.log('------Chỉnh sửa album-----')
                    this.updateAlbum(currentUser)
                    break;
                }
                case albumchoice.DELETE_ALBUM:{
                    console.log('-----Xoá album-----')
                    this.deleteAlbum(currentUser)
                    break;
                }
                case albumchoice.SHOW_SONGIN_ALBUM:{
                    console.log('-----Hiển thị bài hát của album------')
                    this.showSong()
                    break;
                }
               
            }
        }while(choice !=0)1
    }
    showAllAlbums(currentUser:User) {
        console.log('-----Danh sách album nhạc của bạn------')
        let albums = currentUser.albums
        for (let i = 0; i < albums.length; i++) {
            console.log(`ID: ${albums[i].id} ,Tên album: ${albums[i].name}\t `)
        }
    }
    addAlbum(){
        let name = rl.question('Nhập tên album:  ') 
        return new Albums(name)
    }
   
    showCreateAlbum(currentUser: User){
        console.log('-----Thêm album nhạc-----')
        let album= this.addAlbum();
        this.albummanagement.createNew(album)
        currentUser.albums.push(album)
    }
    updateAlbum(currentUser: User){
        console.log('-------Chỉnh sửa album-----')
        let id= +rl.question('Nhập ID album muốn sửa:  ')
        let album = this.addAlbum();
        this.albummanagement.updateById(id ,album)
        for(let i=0; i<currentUser.albums.length; i++){
            if(id == currentUser.albums[i].id){
                album.id = currentUser.albums[i].id;
                album.song = currentUser.albums[i].song;
                currentUser.albums[i]=album
                
            }
        }
        
    }
    deleteAlbum(currentUser: User){
        console.log('-------Xoá album------')
        let id= +rl.question('Nhập ID album muốn xoá:  ')
        let question= +rl.question('Bạn chắc chắn muốn xoá(nhập 1 để xoá  2 để huỷ):  ')
        if(question == 1){
            this.albummanagement.removeById(id);
            for (let i = 0; i <currentUser.albums.length; i++) {
                if(id == currentUser.albums[i].id){
                    currentUser.albums.splice(i,1)
                }
            }

        }else if(question == 2){
            return ;
        }    
    }
    showSong(){
        console.log('---Hiển thị danh sách bài hát---');
                    let name = rl.question('Nhập tên album cần tìm:  ');
                    let album = this.albummanagement.findByName(name);
                    if (album) {
                        for (let i = 0; i < album.song.length; i++) {
                            console.log(`ID: ${i+1},Tên bài hát: ${album.song[i].name}\t Ca sĩ trình bày :${album.song[i].singer}\t Nhạc sĩ:${album.song[i].writer}\t Thể loại : ${album.song[i].type}\t Ngày phát hành:${album.song[i].debuttime}`);
                        }
                    } else {
                        console.log('-----Album không tồn tại!-----');
                    }
    }
   
    
}