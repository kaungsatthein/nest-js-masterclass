import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

/**
 * Class to conneect to users table in database
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Injecting configService
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject CreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  /**
   * Method to create user to database
   */
  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this email already exists, please use another email',
      );
    }

    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to database',
      });
    }
  }

  /**
   * Method to get all users from database
   */
  public async findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return await this.usersRepository.find();
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'This api endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 71,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'This api endpoint does not exist',
      },
    );
  }

  /**
   * Method to get one user from database
   */
  public async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to database',
      });
    }

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
