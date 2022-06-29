import * as rl from 'readline-sync'
import { User } from '../model/user'
import {Song} from '../model/song'
import { Albums } from '../model/album'
import { SongMenu } from './songmenu'
import { AlbumMenu } from './albummenu'
import { UserMenu } from './usermenu'

enum AdminChoice {
    SONG_MANAGEMENT = 1,
    ALBUM_MANAGEMENT = 2,
    USER_MANAGEMENT = 3
}
export class AdminMenu{
    private song = new SongMenu();
    private album = new AlbumMenu()
    private user = new UserMenu()

    run() {
        let choice = -1;
        do {
            console.log('---Ứng dụng quản lý WEB NHAC---')
            console.log('1. Quản lý bai hat')
            console.log('2. Quản lý album nhac')
            console.log('3. quan ly ng dung')
            console.log('0. Đăng xuất')
            choice = +rl.question('Nhập lựa chọn:  ')
            switch (choice) {
                case AdminChoice.SONG_MANAGEMENT: {
                    console.log('---quan ly bai hat----')
                    this.song.run();
                    break;
                }
                case AdminChoice.ALBUM_MANAGEMENT: {
                    console.log('---Quản lý album---');
                    this.album.run()
                    break;
                }
                case AdminChoice.USER_MANAGEMENT:{
                    console.log('---quan ly nguoi dung-----')
                    this.user.run()
                    break;

                }
            }
        } while (choice != 0);

    }
}