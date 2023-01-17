import { Controller } from '@nestjs/common';
import { Body, Post, Req } from '@nestjs/common/decorators';
import { SignupUserDto } from './dto/userSignup.dto';
import { SigninUserDto } from './dto/userSign.dto';
import { updateUserDto } from './dto/userUpdate.dto';
import { UserService } from './user.service';
import { UserMessage } from './user.constant';
import { JwtService } from '@nestjs/jwt';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { userInfo } from 'os';
import { request } from 'http';

/**
 * User Controller for user module
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMessage: UserMessage,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param signupUserDto
   * @returns
   */
  @Post('/signup')
  async signUp(@Body() signupUserDto: SignupUserDto) {
    const user = await this.userService.signUp(signupUserDto);

    return {
      message: this.userMessage.success.UsersignSuccess,
      userDetails: {
        userName: user.userName,
        email: user.email,
        organizationName: user.organizationName,
        countryOfOrigin: user.countryOfOrigin,
      },
    };
  }

  @Post('/signin')
  async signIn(@Body() signinUserDto: SigninUserDto) {
    const user = await this.userService.signIn(signinUserDto);
    let payload = { userId: user._id };
    let access_token = this.jwtService.sign(payload);

    return {
      message: this.userMessage.success.loginSuccess,
      userName: user.userName,
      userEmail: user.email,
      access_token: access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allUsers')
  async getUsers() {
    const users = await this.userService.getUsers();

    return {
      message: this.userMessage.success.getAllUsers,
      allUsersDetails: users,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/userProfile')
  async user(@Req() req: any) {
    const userProfile = await this.userService.userProfile(req.user.userId);

    return {
      message: this.userMessage.success.getUser,
      userDetails: userProfile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/updateProfile')
  async updateUser(@Body() updateUserDto: updateUserDto, @Req() req: any) {
    const updateUser: any = await this.userService.updateProfile(
      updateUserDto,
      req.user.userId,
    );

    return {
      message: this.userMessage.success.updateUserSuccess,
      userDetails: {
        userName: updateUser.userName,
        email: updateUser.email,
        organizationName: updateUser.organizationName,
        countryOfOrigin: updateUser.countryOfOrigin,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/deleteUser')
  async deleteUser(@Req() req: any) {
    const deleteUser = await this.userService.deleteUser(req.user.userId);

    return {
      message:this.userMessage.success.deleteUser
    }
  }

  // @Post('/forgotPassword')
  // async forgotPassword(@Body() this.forgotPassword){

  // }
}
