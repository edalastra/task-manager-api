import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    private readonly users: UserDto[] = [
        {
            id: '1',
            username: 'user',
            password: 'abc123'
        }
    ]

    create(user: UserDto) {
        user.id = uuid();
        user.password = hashSync(user.password, 10);
        this.users.push(user);
    }
}
