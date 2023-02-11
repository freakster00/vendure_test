import { Injectable } from '@nestjs/common';
// import { User } from './user.entity';

@Injectable()
export class UserService {
    public users :any=[
        {
            username:"user1",
            password:"admin",
            email:"user1@gmail.com",
            age:22,
            role:"admin"

        },
        {
            username:"user2",
            password:"admin2",
            email:"user2@gmail.com",
            age:23,
            role:"user"
        },
        {
            username:"user3",
            password:"admin3",
            email:"user3@gmail.com",
            age:25,
            role:"staff"
        },
    ]

getUserByUserName(userName:string){
    return this.users.find((user)=>user.username===userName)
}

}
