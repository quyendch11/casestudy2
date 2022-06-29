import * as rl from 'readline-sync'
import { User } from '../model/user'
import { UserManagement } from '../management/usermanagement'
import { UserSongMenu } from './usersongmenu';
import { UserAlbumMenu } from './useralbummenu';

enum UserChoice {
    ALBUM_MANAGEMENT = 1,
    SONG_MANAGEMENT = 2  
}

export class UserChoiceMenu {
    private song = new UserSongMenu();
    private album = new UserAlbumMenu();

    run(currentUser:User){
        let choice = -1;
        do {
            console.log('---nguoi dung---')
        console.log('1. album')
        console.log('2. bai hat ')
        console.log('0. Đăng xuất')
        choice = +rl.question('nhap lua chon ');
        switch (choice) {
            case UserChoice.ALBUM_MANAGEMENT:{
                console.log('quan ly album')
                this.album.run(currentUser);
                break;
                }
            case UserChoice.SONG_MANAGEMENT:{
                console.log('quan ly bai hat')
                this.song.run(currentUser);
                break;
                }
            }
        } while (choice != 0)
        
    }

}