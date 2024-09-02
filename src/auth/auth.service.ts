import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    // private readonly logger: Logger,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(id);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async getUserProfile(id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  async login(user: LoginDto) {
    //check if user exists
    const existingUser = await this.usersService.findOneByEmail(user.email);
    console.log(existingUser);
    if (!existingUser) {
      throw new BadRequestException({
        error: true,
        message: 'Invalid credentials',
      });
    }

    // check if user is banned
    if (existingUser.isBanned) {
      throw new BadRequestException({
        error: true,
        message: 'This account is banned, Kindly reachout to support.',
      });
    }
    // check for password correctness
    if (!(await bcrypt.compare(user.password, existingUser.password))) {
      throw new BadRequestException({
        error: true,
        message: 'Invalid credentials',
      });
    }

    // generate JWT
    const payload = {
      email: existingUser.email,
      userId: existingUser.id,
      role: existingUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      name: existingUser.name,
      role: existingUser.role,
    };
  }

  async signup(signUpDto: Partial<User>) {
    // find if userExists
    const userExists = await this.usersService.findOneByEmail(signUpDto.email);
    if (userExists) {
      throw new BadRequestException({
        error: true,
        message: 'User with this email already exist, kindly login.',
      });
    }
    await this.usersService.create(signUpDto);
    return { error: false, message: 'User Account created successfully' };
  }
}
