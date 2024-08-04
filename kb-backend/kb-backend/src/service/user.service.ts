import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';

@Scope(ScopeEnum.Request, { allowDowngrade: true })
@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  }

  async getUserByPassword(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) throw Error('User not found');
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw Error('Password incorrect.');
    return user;
  }

  async getUserById(user_id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw Error('User does not exist');
    return user;
  }

  async updatePassword(user_id: number, newPassword: string): Promise<void> {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(user_id, { password: hashedPassword });
  }

  async updateLoginTime(user_id: number, login_time: number): Promise<void> {
    await this.userRepository.update(user_id, { login_time: login_time });
  }

  async register(
    username: string,
    password: string
  ): Promise<User> {
    const newUser = new User();
    const hashedPassword = await this.hashPassword(password);
    newUser.username = username;
    newUser.password = hashedPassword;
    if (this.userRepository==null){console.log('未正确初始化')};
    console.log(newUser);
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

}