import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  // constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  constructor(@Inject('UserModelToken') private readonly userModel: Model<IUser>) {}

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    console.log('[service:user] create', createUserDto);
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  async delete(id: string): Promise<{}> {
    return await this.userModel.deleteOne({ _id: id });
  }
}
