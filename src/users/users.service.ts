import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "./interfaces/user.interface";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log("[service:user] create", createUserDto);
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async delete(id: string): Promise<{}> {
    return await this.userModel.deleteOne({ _id: id });
  }
}
