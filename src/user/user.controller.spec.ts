import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { SigninUserDto } from './dto/userSign.dto';
import { SignupUserDto } from './dto/userSignup.dto';
import { UserServiceMock } from './mock/user.service.mock';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserMessage } from './user.constant';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userMessage: UserMessage;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        UserMessage,
        JwtService,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('User Authentication', () => {
    it('should return user after signup', async () => {
      const userServiceSignUpSpy = jest.spyOn(userService, 'signUp');
      const testDTO = new SignupUserDto();
      let result = await userController.signUp(testDTO);

      expect(userServiceSignUpSpy).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'User registered successfully.',
        userDetails: {
          userName: 'Bhaumik',
          email: 'bhaumik@gmail.com',
          organizationName: 'Viitorcloud',
          countryOfOrigin: 'IN',
        },
      });
    });

    // it('should return login after signin', async () => {
    //   const userServiceSignInSpy = jest.spyOn(userService, 'signIn');
    //   const testSignInDTO = new SigninUserDto();
    //   let result = await userController.signIn(testSignInDTO);
    //   const payload = { userId: '1' };
    //   const access_token = jwtService.sign(payload);
    //   console.log('result=====>', result);

    //   expect(userServiceSignInSpy).toHaveBeenCalled();
    //   expect(result).toEqual({
    //     message: 'User loggedin successfully.',
    //     userName: 'bhaumik105',
    //     userEmail: 'Bj1234@gmail.com',
    //     access_token:
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2MwZjI3NzVjZjI0M2E5YTEyYTNjNDMiLCJpYXQiOjE2NzM1OTM1MzUsImV4cCI6MTY3MzYyMjMzNX0.IP8dqq_7uUy6UmPnNY8mcZYhcN-jGbXE0WV3VOdFoKU',
    //   });
    // });

    it('should return all the users', async () => {
      let result = await userController.getUsers();

      expect(result).toHaveBeenCalled();
      expect(result).toEqual({
        "message": "All users get successfully.",
        "allUsersDetails": [
            {
                "_id": "63bfceaa1d02628260b834ae",
                "userName": "bhaumik105",
                "email": "bj@gmail.com",
                "organizationName": "Viitorcloud",
                "countryOfOrigin": "IN"
            },
            {
                "_id": "63bfced23dea5a8b97838a48",
                "userName": "bhaumik105",
                "email": "bjoshi@gmail.com",
                "organizationName": "Viitorcloud",
                "countryOfOrigin": "IN"
            },
            {
                "_id": "63bfcf19fc0df96d80d210d4",
                "userName": "bhaumik105",
                "email": "bjoshi1@gmail.com",
                "organizationName": "Viitorcloud",
                "countryOfOrigin": "IN"
            },
            {
                "_id": "63bfd547385ec57246d11cf2",
                "userName": "bhaumik105",
                "email": "bjoshi12@gmail.com",
                "organizationName": "Viitorcloud",
                "countryOfOrigin": "IN"
            },
            {
                "_id": "63bfeee8fa10a264446e220c",
                "userName": "bhaumik105",
                "email": "bj1234@gmail.com",
                "organizationName": "Viitorcloud",
                "countryOfOrigin": "IN"
            },
            {
                "_id": "63c0f2775cf243a9a12a3c43",
                "userName": "bhaumik105",
                "email": "Bj1234@gmail.com",
                "organizationName": "Viitorcloud",
                "countryOfOrigin": "IN"
            }
        ]
      });
    });
  });
});
