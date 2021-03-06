import { UserManagement } from "../management/usermanagement";
import { User } from "../model/user";
import * as rl from "readline-sync";
import { AdminMenu } from "./adminmenu";
import{Role} from "../model/role";
import { UserChoiceMenu } from "./userchoicemenu";

enum LoginChoise {
    LOGIN=1,
    REGISTER=2
}
export class LoginMenu{
    private usermanagement = new UserManagement();
    private adminmenu = new AdminMenu();
    private userchoicemenu = new UserChoiceMenu()
    run(){
        let choice = -1;
        do{
            console.log("-----Chào mừng tới nhạc của  tao-------")
        console.log("-----Vui lòng đăng nhập-----")
        console.log("1.Đăng nhập")
        console.log("2. Đăng ký")
        console.log("0. Thoát")
        choice = +rl.question('Vui lòng nhập lựa chọn:   ')
        switch(choice) {
            case LoginChoise.LOGIN:{
                this.loginform();
                break;
            }
            case LoginChoise.REGISTER:{
                this.registerform();
                break;
            }
        }
        }while(choice != 0)
        
    }
    loginform(){
        let username = rl.question('Nhập tài khoản:  ');
        let password = rl.question('Nhập mật khẩu:  ');
        let currentUser = this.usermanagement.login(username, password);
        if(currentUser != null ){
            console.log('-----Đăng nhập thành công-----');
            if (currentUser.role == Role.ADMIN) {
                this.adminmenu.run();
            } else {
               this.userchoicemenu.run(currentUser);
            }
         }  else {
            console.log('----Tài khoản hoặc mật khẩu không đúng!-----');
        }
        
    }

    registerform(){
        let user = this.inputUser();
        this.usermanagement.createNew(user);
        console.log('---Đăng ký thành công!----')
    }

    inputUser(): User {
        let username = this.inputusername();
        let regexForPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(password);
        let name = rl.question('Nhập họ tên:  ');
        let email = this.inputEmail();
        return new User(name, email,username, password);
    }
    inputEmail(): string {
        let email = '';
        let isValidEmail = true;
        do {
            email = rl.question('Nhập email (abc@gmail.com): ');
            let regexForEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('----Định dạng email không hợp lệ!----')
            } else {
                isValidEmail = true;
                let currentUser = this.usermanagement.findByEmail(email);
                if (currentUser) {
                    console.log('---Email đã tồn tại---');
                    isValidEmail = false;
                } else {
                    isValidEmail = true;
                }
            }

        } while (!isValidEmail);
        return email;
    }
    inputusername():string{
        let username = '';
        let isValidUsername = true;
        do {
            username = rl.question('Nhập tài khoản:  ');
            let currentUser = this.usermanagement.findByName(username);
            if (currentUser) {
                isValidUsername = false;
                console.log('----Tài khoản đã tồn tại !----')
            } else {
                isValidUsername = true;
            }
        } while (!isValidUsername);
        return username;
    }

    inputPassword(regexForPassword: RegExp): string {
        let password = '';
        let isValidPassword = true;
        do {
            password = rl.question('Nhập mật khẩu (Có 1 ký tự viết hoa, 1 viết thường, 1 ký tự đặc biệt và 1 số):  ');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('Mật khẩu nhập vào phải có ít nhất 1 ký tự thường 1 hoa 1 đặc biệt 1 số!')
            } else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return password;
    }

    inputConfirmPassword(password: string): void {
        let confirmPassword = '';
        do {
            confirmPassword = rl.question('Vui lòng nhập lại mật khẩu:   ');
            if (password != confirmPassword) {
                console.log('----Mật khẩu không đúng----');
            }
        } while (password != confirmPassword)
    }

}