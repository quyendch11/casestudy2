import * as rl from 'readline-sync'
import { User } from '../model/user'
import { UserManagement } from '../management/usermanagement'


enum userchoice {
    SHOW_ALL_USER = 1,
    ADD_NEW_USER = 2,
    UPDATE_USER= 3,
    DELETE_USER = 4,
    SHOW_ALBUM = 5
}

export class UserMenu{
    private usermanagement = new UserManagement();
    

    run(){
        let choice = -1;
        do{
            console.log('----Quản lý người dùng----')
            console.log('1. Hiển thị tất cả người dùng')
            console.log('2. Thêm người dùng mới')
            console.log('3. Chỉnh sửa thông tin người dùng')
            console.log('4. Xoá người dùng')
            console.log('5. Hiển thị album của người dùng')
            console.log('0. Thoát')
            choice = +rl.question('Mời nhập lựa chọn :  ')
            switch(choice) {
                case userchoice.SHOW_ALL_USER:{
                    this.showAllUser()
                    break;
                }
                case userchoice.ADD_NEW_USER:{
                    this.showCreateUser()
                    break;
                }
                case userchoice.UPDATE_USER:{
                    this.updateUser()
                    break;
                }
                case userchoice.DELETE_USER:{
                    this.deleteUser()
                    break;
                }
                case userchoice.SHOW_ALBUM:{
                    this.showAlbum()
                    break;
                }
            }
        }while(choice !=0)
    }
    showAllUser() {
        console.log('------Danh sách người dùng------')
        let users = this.usermanagement.getAll()
        for(let user of users) {
            console.log(`ID: ${user.id}, Tên người dùng: ${user.name}\t Email: ${user.email}\t Tài khoản: ${user.username}\t Mật khẩu: ${user.password}`)
        }
    }
    addUser(){
        let name = rl.question('Nhập tên người dùng: ') 
        let email = rl.question('Nhập  email: ')
        let username = rl.question('Nhập tài khoản:  ')
        let password = rl.question('Nhập mật khẩu:  ')
        return new User(name,email,username,password)
    }
   
    showCreateUser(){
        console.log('-------Thêm người dùng------')
        let user= this.addUser();
        this.usermanagement.createNew(user)
    }
    updateUser(){
        console.log('-------Chỉnh sửa thônbg tin người dùng-----')
        let id= +rl.question('Nhập ID người dùng muốn sửa: ')
        let user = this.addUser();
        this.usermanagement.updateById(id ,user)
    }
    deleteUser(){
        console.log('------Xoá người dùng-----')
        let id= +rl.question('Nhập ID người dùng muốn xoá: ')
        let question= +rl.question('Bạn chắc chắn muốn xoá (Nhập 1 để xoá 2 để huỷ): ')
        if(question == 1){
            this.usermanagement.removeById(id);
        }else if(question == 2){
            return ;
        }    
    }
    showAlbum(){
        console.log('---Hiển thị danh sách album---');
        let name = rl.question('Nhập tên user cần tìm: ');
        let user = this.usermanagement.findByName(name);
        if (user) {
            for (let i = 0; i < user.albums.length; i++) {
                console.log(`ID:  ${i+1},Tên album: ${user.albums[i].name}\t `);
            }
        } else {
            console.log('------Album không tồn tại!-------');
        }
    }
}