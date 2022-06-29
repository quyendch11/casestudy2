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
            console.log('----quan ly album----')
            console.log('1. hien thi tat ca albums')
            console.log('2. tao album moi')
            console.log('3. sua album')
            console.log('4. xoa album')
            console.log('5. hien thi bai hat cua album')
            console.log('0. thoat')
            choice = +rl.question('chon de  ')
            switch(choice) {
                case albumchoice.SHOW_ALL_ALBUM:{
                    console.log('tat ca album cua nguoi dung')
                    this.showAllAlbums(currentUser)
                    break;
                }
                case albumchoice.ADD_NEW_ALBUM:{
                    console.log('tao album moi')
                    this.showCreateAlbum(currentUser)
                    break;
                }
                case albumchoice.UPDATE_ALBUM:{
                    console.log(' sua album')
                    this.updateAlbum(currentUser)
                    break;
                }
                case albumchoice.DELETE_ALBUM:{
                    console.log(' xoa album')
                    this.deleteAlbum(currentUser)
                    break;
                }
                case albumchoice.SHOW_SONGIN_ALBUM:{
                    console.log('hien thi bai hat cua album')
                    this.showSong()
                    break;
                }
               
            }
        }while(choice !=0)1
    }
    showAllAlbums(currentUser:User) {
        console.log('danh sach album nhac')
        let albums = currentUser.albums
        for (let i = 0; i < albums.length; i++) {
            console.log(`${albums[i].id},ten album: ${albums[i].name}\t `)
        }
    }
    addAlbum(){
        let name = rl.question('nhap ten album  ') 
        return new Albums(name)
    }
   
    showCreateAlbum(currentUser: User){
        console.log('them album nhac ')
        let album= this.addAlbum();
        this.albummanagement.createNew(album)
        currentUser.albums.push(album)
    }
    updateAlbum(currentUser: User){
        console.log('sua album')
        let id= +rl.question('nhap id album muon sua  ')
        let album = this.addAlbum();
        this.albummanagement.updateById(id ,album)
        for(let i=0; i<currentUser.albums.length; i++){
            if(id == currentUser.albums[i].id){
                album.id= currentUser.albums[i].id;
                album.song= currentUser.albums[i].song;
                currentUser.albums[i]=album
                
            }
        }
        
    }
    deleteAlbum(currentUser: User){
        console.log('xoa album')
        let id= +rl.question('nhap id album muon xoa  ')
        let question= +rl.question('hay chac muon xoa(nhap 1 de xoa 2 de thoi)  ')
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
        console.log('---Hiển thị danh sách bai hat---');
                    let name = rl.question('Nhập tên album cần tìm:  ');
                    let album = this.albummanagement.findByName(name);
                    if (album) {
                        for (let i = 0; i < album.song.length; i++) {
                            console.log(`${i+1},ten bai hat: ${album.song[i].name}\t ca sy trinh bay :${album.song[i].singer}\t nhac si:${album.song[i].writer}\t the loai: ${album.song[i].type}\t ngay phat hanh:${album.song[i].debuttime}`);
                        }
                    } else {
                        console.log('album không tồn tại!');
                    }
    }
   
    
}