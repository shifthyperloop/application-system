import BaseEntity from "./BaseEntity";

class User extends BaseEntity {
    email: string;
    name: string;
    password: string;
}

module.exports = User;