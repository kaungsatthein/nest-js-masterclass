import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Headers,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Limit the number of results',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number',
    example: 1,
  })
  public getAllUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUser(
    @Headers() headers: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(headers, createUserDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
