import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMessage {
  success = {
    UsersignSuccess: 'User registered successfully.',
    loginSuccess: 'User loggedin successfully.',
    getAllUsers: 'All users get successfully.',
    getUser: 'User profile get successfully.',
    updateUserSuccess: 'User data update successfully.',
    deleteUser: 'User delete successfully.'
  };

  error = {
    UserNotFound: 'User not found please check email.',
    incorrectCredentials: 'Incorrect credentials!',
  };
  static success: any;
}
