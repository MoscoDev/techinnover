import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/pagination/page.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    role: return this.usersRepository.save({ ...user });
  }
  async getUsers(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const [entities, itemCount] = await this.usersRepository.findAndCount({
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  getUser(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async findOneByEmail(emailAddress: string): Promise<User> {
    const userDataSelection = {
      password: true,
      email: true,
      name: true,
      role: true,
      id: true,
    };
    console.log(userDataSelection);
    return this.usersRepository.findOne({
      where: { email: emailAddress },
      select: userDataSelection,
    });
  }

  async updateBanStatus(userId: string, isBanned: boolean): Promise<void> {
    try {
      const user = await this.usersRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      await this.usersRepository.update({ id: user.id }, { isBanned });
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
