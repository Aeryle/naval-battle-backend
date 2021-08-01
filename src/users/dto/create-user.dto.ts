import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '../../constants';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(15)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(15)
  @Matches(PASSWORD_REGEX)
  password: string;
}
