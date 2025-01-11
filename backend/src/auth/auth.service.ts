import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpInfo: SignUpDto) {
    const existedUser = await this.userService.findByUsername(
      signUpInfo.username,
    );

    if (existedUser) {
      throw new BadRequestException('Username already exists');
    }

    await this.userService.create({
      username: signUpInfo.username,
      password: signUpInfo.password,
    });

    return {
      message: 'Register successfully',
      success: true,
    };
  }

  async signIn(signinInfo: SignInDto) {
    const user = await this.userService.findByUsername(signinInfo.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(signinInfo.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id },
      this.configService.get('JWT_SECRET_KEY'),
      {
        expiresIn: this.configService.get('JWT_EXPIRED'),
      },
    );

    return {
      accessToken: token,
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        this.configService.get('JWT_SECRET_KEY'),
      ) as { userId: number };
      const user = await this.userService.findOne(decoded.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
