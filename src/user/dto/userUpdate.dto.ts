import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class updateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  _id: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  organizationName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  countryOfOrigin: string;
}
