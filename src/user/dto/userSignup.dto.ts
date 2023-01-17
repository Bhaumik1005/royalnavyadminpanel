import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  organizationName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  countryOfOrigin: string;
}
