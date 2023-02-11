import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './RoleGuard'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService:AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard("local"))
  login(@Request()req): string {
   return this.authService.generateToken(req.user);
  }

  @Get('/admin')
  @UseGuards(AuthGuard("jwt"),new RoleGuard("admin"))
  getAdmin(@Request() req){
    return "Admin Panel"
  }
  @Get('/user')
  @UseGuards(AuthGuard("jwt"),new RoleGuard("user"))
  getUser(@Request() req){
    return "User Dashboard"
  }
  @Get('/staff')
  @UseGuards(AuthGuard("jwt"),new RoleGuard("staff"))
  getStaff(@Request() req){
    return "Staff Panel"
  }
}
