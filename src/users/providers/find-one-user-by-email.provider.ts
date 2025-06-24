import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject usersRepository to access user data.
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Find a user by their email address.
   */
  public async findOneByEmail(email: string) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error.message, {
        description: 'Could not fetch the user by email',
      });
    }
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
