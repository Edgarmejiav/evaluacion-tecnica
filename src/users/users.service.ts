import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.create(data);
      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error?.code === 11000) {
        throw new NotFoundException('User already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, data: Partial<User>): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) throw new NotFoundException();
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException();
  }
}
