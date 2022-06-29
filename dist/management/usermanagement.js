"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagement = void 0;
const user_1 = require("../model/user");
const role_1 = require("../model/role");
class UserManagement {
    constructor() {
        let admin = new user_1.User('ADMIN', 'admin@gmail.com', 'admin', 'admin');
        admin.id = UserManagement.id;
        admin.role = role_1.Role.ADMIN;
        UserManagement.users[0] = admin;
    }
    getAll() {
        return UserManagement.users;
    }
    createNew(t) {
        UserManagement.id++;
        t.id = UserManagement.id;
        t.role = role_1.Role.USER;
        UserManagement.users.push(t);
    }
    updateById(id, t) {
        let index = this.findById(id);
        if (index != -1) {
            t.id = UserManagement.users[index].id;
            UserManagement.users[index] = t;
        }
    }
    removeById(id) {
        let index = this.findById(id);
        if (index != -1) {
            UserManagement.users.splice(index, 1);
        }
    }
    findById(id) {
        let index = -1;
        for (let i = 0; i < UserManagement.users.length; i++) {
            if (UserManagement.users[i].id === id) {
                index = i;
            }
        }
        return index;
    }
    login(username, password) {
        for (let user of UserManagement.users) {
            if (username == user.username && password == user.password) {
                return user;
            }
        }
        return null;
    }
    findByName(username) {
        for (let user of UserManagement.users) {
            if (username == user.username) {
                return user;
            }
        }
        return null;
    }
    findByEmail(email) {
        for (let user of UserManagement.users) {
            if (email == user.email) {
                return user;
            }
        }
        return null;
    }
}
exports.UserManagement = UserManagement;
UserManagement.users = [];
UserManagement.id = 0;
