import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
// import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
constructor(private readonly userService:UserService){
super();
}
    validate(userName:string,password:string):any{
        const user:any=this.userService.getUserByUserName(userName)
        if(user===undefined) throw new UnauthorizedException();
        if(user!==undefined && user.password==password)  {
           
            console.log("Jwt Generated")
            return user;
        }
        else{
            throw new UnauthorizedException();
        }
    }

}