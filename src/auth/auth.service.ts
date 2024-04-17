import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthDto, AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    signin({ username, password }: AuthDto): AuthResponseDto {
        const user = this.userService.findByUsername(username);

        if(!user || !compareSync(password, user.password)) {
            throw new UnauthorizedException("Username or password does not valid.");
        }

        const jwtPayload = {
            sub: user.id,
            username: user.username
        };

        const token = this.jwtService.sign(jwtPayload);

        return { token, expiresIn: this.jwtExpirationTimeInSeconds }
    }
}
