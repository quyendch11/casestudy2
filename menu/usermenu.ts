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
            console.log('----quan ly USER----')
            console.log('1. hien thi tat ca user')
            console.log('2. them user moi')
            console.log('3. sua user')
            console.log('4. xoa user')
            console.log('5. hien thi album cua user')
            console.log('0. thoat')
            choice = +rl.question('chon de')
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
        console.log('danh sach user')
        let users = this.usermanagement.getAll()
        for(let user of users) {
            console.log(`${user.id},ten user: ${user.name}\t email:${user.email}\t username:${user.username}\t password:${user.password}`)
        }
    }
    addUser(){
        let name = rl.question('nhap ten user') 
        let email = rl.question('nhap email')
        let username = rl.question('nhap username')
        let password = rl.question('nhap password')
        return new User(name,email,username,password)
    }
   
    showCreateUser(){
        console.log('them user')
        let user= this.addUser();
        this.usermanagement.createNew(user)
    }
    updateUser(){
        console.log('sua album')
        let id= +rl.question('nhap id user muon sua')
        let user = this.addUser();
        this.usermanagement.updateById(id ,user)
    }
    deleteUser(){
        console.log('xoa user')
        let id= +rl.question('nhap id user muon xoa')
        let question= +rl.question('hay chac muon xoa(nhap 1 de xoa 2 de thoi) ')
        if(question == 1){
            this.usermanagement.removeById(id);
        }else if(question == 2){
            return ;
        }    
    }
    showAlbum(){
        console.log('---Hiển thị danh sách album---');
        let name = rl.question('Nhập tên user cần tìm:');
        let user = this.usermanagement.findByName(name);
        if (user) {
            for (let i = 0; i < user.albums.length; i++) {
                console.log(`${i+1},ten album: ${user.albums[i].name}\t `);
            }
        } else {
            console.log('album không tồn tại!');
        }
    }
}