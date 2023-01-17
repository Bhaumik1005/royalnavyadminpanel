import { SigninUserDto } from '../dto/userSign.dto';
import { SignupUserDto } from '../dto/userSignup.dto';

export class UserServiceMock {
  async signUp(signupUserDto: SignupUserDto) {
    return {
      userName: 'Bhaumik',
      email: 'bhaumik@gmail.com',
      organizationName: 'Viitorcloud',
      countryOfOrigin: 'IN',
    };
  }

  async signIn(signinUserDto: SigninUserDto) {
    return {
      userName: 'bhaumik105',
      email: 'Bj1234@gmail.com',
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwZjI3NzVjZjI0M2E5YTEyYTNjNDMiLCJpYXQiOjE2NzM1OTM1MzUsImV4cCI6MTY3MzYyMjMzNX0.IP8dqq_7uUy6UmPnNY8mcZYhcN-jGbXE0WV3VOdFoKU',
    };
  }
}
