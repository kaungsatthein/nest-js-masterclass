import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Class to conneect to users table in database
 */
@Injectable()
export class UsersService {
  // constructor(
  //   @Inject(forwardRef(() => AuthService))
  //   private readonly authService: AuthService,
  // ) {}

  /**
   * Method to get all users from database
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Jane',
        email: 'jane@doe.com',
      },
    ];
  }

  /**
   * Method to get one user from database
   */
  public findOneById(id: number) {
    return {
      firstName: 'John',
      email: 'john@doe.com',
    };
  }

  /**
   * Method to create user to database
   */
  public createUser(headers, createUserDto: CreateUserDto) {
    return 'User created successfully';
  }
}
