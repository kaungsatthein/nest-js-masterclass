import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Headers,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id{/:optional}')
  public getAllUsers(@Param('id') id: any, @Query('limit') limit: any) {
    console.log('params', id);
    console.log('limit', limit);
    return 'get all users';
  }

  @Post()
  public createUser(@Body() request: any, @Headers() headers: any) {
    console.log('headers', headers);
    console.log('request', request);
    return 'create a user';
  }
}
