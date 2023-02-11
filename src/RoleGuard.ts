import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


@Injectable()
export class RoleGuard implements CanActivate {

    private role:string;
    constructor(role:string){
        this.role=role;
    }
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const ctx = context.switchToHttp()
    const request:any = ctx.getRequest<Request>();
    if(request.user.role=="admin"){
      return true
    }
    else if(request.user.role==this.role){
      return true
    }
    else{
      return false
    }
    // return this.role==request.user.role;
  }
}