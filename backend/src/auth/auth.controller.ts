import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() registerDto: SignUpDto) {
    return this.authService.signUp(registerDto);
  }

  @Post('sign-in')
  async signIn(@Body() loginDto: SignInDto) {
    return this.authService.signIn(loginDto);
  }
}
