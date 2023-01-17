import {
  Body, Controller, Post, Get,
  Param, HttpCode, HttpStatus,
  Patch, UseGuards, Req, Res,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillObject, getMulterOptions, MongoIdValidationPipe } from '@readme/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@readme/core';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { DetailedUserRdo } from './rdo/detailed-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { UserAuthMessages } from './auth.constant';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UpdateUserDto } from './dto/update-user.dto';
import path = require('path');
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: UserAuthMessages.CREATE,
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CONFLICT,
    description: UserAuthMessages.ALREADY_EXISTS
  })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: UserAuthMessages.LOGIN,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `${UserAuthMessages.WRONG_PASSWORD} or ${UserAuthMessages.WRONG_LOGIN}`
  })
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return this.authService.loginUser(verifiedUser);
  }

  @Get('/:id')
  @ApiResponse({
    type: DetailedUserRdo,
    status: HttpStatus.NOT_FOUND,
    description: UserAuthMessages.NOT_FOUND,
  })
  public async showDetails(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillObject(DetailedUserRdo, existUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  @ApiResponse({
    type: DetailedUserRdo,
    status: HttpStatus.OK,
    description: UserAuthMessages.UPDATE,
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.NOT_FOUND,
    description: UserAuthMessages.NOT_FOUND,
  })
  public async update(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(req.user['sub'], dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('pass')
  @ApiResponse({
    type: DetailedUserRdo,
    status: HttpStatus.OK,
    description: UserAuthMessages.PASSWORD_CHANGE,
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.NOT_FOUND,
    description: UserAuthMessages.NOT_FOUND,
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CONFLICT,
    description: UserAuthMessages.WRONG_PASSWORD,
  })
  public async changePassword(@Req() req: Request, @Body() dto: ChangeUserPasswordDto) {
    const updatedUser = await this.authService.change(req.user['sub'], dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('notify')
  @ApiResponse({
    type: DetailedUserRdo,
    status: HttpStatus.OK,
    description: UserAuthMessages.NOTIFY,
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.NOT_FOUND,
    description: UserAuthMessages.NOT_FOUND,
  })
  public async notify(@Req() req: Request, @Res() res: Response) {
    await this.authService.notifyNewPublications(req.user['sub']);
    return res.status(HttpStatus.OK).send();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', getMulterOptions()))
  @Post('avatar')
  public async upload(@UploadedFile() file: Express.Multer.File, @Body() dto: UpdateUserDto, @Req() req: Request) {
    const updatedUser = await this.authService.updateUser(req.user['sub'], { ...dto, avatar: file.filename });
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('avatar/:image')
  public async read(@Param('image') image: string, @Req() req: Request, @Res() res: Response) {
    return res.sendFile(path.resolve(__dirname, process.env.FILE_UPLOAD_DEST, req.user['sub'], image));
  }
}
