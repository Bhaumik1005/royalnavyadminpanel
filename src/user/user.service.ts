import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SignupUserDto } from './dto/userSignup.dto';
import { SigninUserDto } from './dto/userSign.dto';
import { updateUserDto } from './dto/userUpdate.dto';
import { User } from './entities/user.entities';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { UserMessage } from './user.constant';

@Injectable()
export class UserService {
  /**
   *
   * @param userModel
   */
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly userMessage: UserMessage,
  ) {}

  /**
   *
   * @param signupUserDto
   * @returns
   */
  async signUp(signupUserDto: SignupUserDto) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(signupUserDto.password, salt);

    signupUserDto.password = hashedPassword;
    const user = new this.userModel(signupUserDto);
    await user.save();
    return user;
  }

  /**
   *
   * @param signinUserDto
   * @returns
   */
  async signIn(signinUserDto: SigninUserDto) {
    let user: any = await this.userModel.findOne({
      email: signinUserDto.email,
    });

    if (!user) {
      throw new NotFoundException(this.userMessage.error.UserNotFound);
    } else {
      const isvalidePassword = await bcrypt.compare(
        signinUserDto.password,
        user.password,
      );

      if (isvalidePassword && user.isUserActive) {
        return user;
      } else {
        throw new UnauthorizedException(
          this.userMessage.error.incorrectCredentials,
        );
      }
    }
  }

  async getUsers() {
    let users = await this.userModel.find(
      {},
      {
        _id: 1,
        userName: 1,
        email: 1,
        organizationName: 1,
        countryOfOrigin: 1,
      },
    );
    return users;
  }

  async userProfile(UserId: string) {
    let userProfile = await this.userModel.find(
      { _id: UserId },
      {
        _id: 1,
        userName: 1,
        email: 1,
        organizationName: 1,
        countryOfOrigin: 1,
      },
    );
    return userProfile;
  }

  async updateProfile(updateUserDto: updateUserDto, UserId: string) {
    let updateUser = await this.userModel.findOneAndUpdate(
      { _id: UserId },
      {
        userName: updateUserDto.userName,
        organizationName: updateUserDto.organizationName,
        countryOfOrigin: updateUserDto.countryOfOrigin,
      },
      { new: true },
    );

    return updateUser;
  }

  async deleteUser(userId: string) {
    let deleteUser = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        isUserActive: false,
      },
      {
        new: true,
      },
    );
    
    return deleteUser;
  }
}
