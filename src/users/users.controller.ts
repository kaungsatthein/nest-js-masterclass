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
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  @Get('/{:id}')
  public getAllUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('params', typeof getUsersParamDto);
    console.log('getUsersParamDto', getUsersParamDto);
    console.log('type of limit', typeof limit);
    console.log('type of page', typeof page);
    console.log('limit', limit);
    console.log('page', page);
    return 'get all users';
  }

  @Post()
  public createUser(
    @Headers() headers: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log('headers', headers);
    console.log('request', createUserDto);
    return 'create a user';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
