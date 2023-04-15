import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private readonly users: User[];

  constructor(private readonly jwtService: JwtService) {
    this.users = [
      {
        id: 1,
        username: 'john',
        password:
          '$2b$10$5P5mlBv7gB1RbJH7VgHnROoNHPJKfgG2Qn/1dNbi1IMwJjYqN3qna', // 'secret'
      },
      {
        id: 2,
        username: 'jane',
        password:
          '$2b$10$5P5mlBv7gB1RbJH7VgHnROoNHPJKfgG2Qn/1dNbi1IMwJjYqN3qna', // 'secret'
      },
    ];
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.username === username);
    if (user && (await compare(password, user.password))) {
      const { password: hashedPassword, ...result } = user;
      const userWithPassword = { ...result, password: hashedPassword };
      return userWithPassword;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
