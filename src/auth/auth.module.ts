import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[PassportModule,UserModule,
        JwtModule.register({
            secret: "super-secret-key",
            signOptions: { expiresIn: '15m' },
          }),],
    providers:[LocalStrategy, JwtStrategy,AuthService],
    exports:[AuthService]
})
export class AuthModule {}
