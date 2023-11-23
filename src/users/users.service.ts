import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User, UserRole } from "../common/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto } from "./dto/user-create.dto";
import { Pagination } from "../common/pagination/pagination.dto";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }


  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(dto: UserCreateDto) {
    const createdUser = this.userRepository.create({
      ...dto,
    });
    return this.userRepository.save(createdUser);
  }

  async getUsersPagination(pagination: Pagination) {
    const queryBuilder = this.userRepository
      .createQueryBuilder("user")
      .skip(pagination.skip)
      .take(pagination.take)
      .orderBy("user.createdAt", pagination.order);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where : { id }});
    if (!user) {
      throw new ApiException(ErrorCode.USER_NOT_FOUND)
    }
    return user;
  }

  async findByIds(ids: number[]) {
    return await this.userRepository.
      createQueryBuilder("user")
      .where("user.id IN (:...ids)", { ids })
      .getMany();
  }

  async lockUser(id: number, isLocked: boolean) {
    const user = await this.getById(id);
    user.isLocked = isLocked;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
     return await this.userRepository.delete({ id } )
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async updateUser(id: number, role: UserRole) {
    const user = await this.getById(id);
    user.roles = role;
    return await this.userRepository.save(user);
  }
}