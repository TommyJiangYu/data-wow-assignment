import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(userInfo: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);

    const user = await this.repo.create({
      username: userInfo.username,
      name: userInfo.username,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return await this.repo.findOne({ where: { username } });
  }
}
