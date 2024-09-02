import {
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Body,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Roles, RolesGuard } from '../auth/role.guard';
import { AuthGuard } from 'src/auth/auth.guards';
import { UserRole } from './dto/user-profile.dto';
import { BanUnbanUserDto, BanUnbanUserParam } from './dto/ban-user.dto';
import { PageDto, PageOptionsDto } from 'src/pagination/page.dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return this.usersService.getUsers(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Patch(':id/ban-status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update user ban status' })
  @ApiParam({ type: new BanUnbanUserParam().id, name: 'id' })
  @ApiBody({ type: BanUnbanUserDto, required: true })
  @ApiResponse({ status: 200, description: 'User ban status updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateBanStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { banStatus: boolean },
  ) {
    return await this.usersService.updateBanStatus(id, body.banStatus);
  }
}
