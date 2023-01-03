import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
  ) {}

  async create(user: UserDto) {
    const { id, email, password } = user;
    const data = new User(id, email, password);
    await this.userRepository.persistAndFlush(data);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
    // return this.buildUserRO(users);
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      return `${err}`;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    wrap(user).assign(updateUserDto);
    await this.userRepository.flush();

    return user;
  }

  async removeById(id: number) {
    try {
      // await this.userRepository.remove({ id }); // Error: You need to pass entity instance or reference to 'em.remove()'. To remove entities by condition, use 'em.nativeDelete()'.
      await this.userRepository.nativeDelete({ id });
      return `This action removes a #${id} user`;
    } catch (err) {
      return `${err}`;
    }
  }

  private buildUserRO(user: User) {
    const userRO = {
      email: user.email,
      // token: this.generateJWT(user),
      password: user.password,
    };

    return { user: userRO };
  }
}
