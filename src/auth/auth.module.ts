import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: Number(configService.get<number>('JWT_EXPIRATION_TIME'))}
    }),
    inject: [ConfigService]
  }),
  UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
