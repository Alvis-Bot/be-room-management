import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { UserCreateDto } from "./dto/user-create.dto";
import { UsersService } from "./users.service";
import { Pagination } from "../common/pagination/pagination.dto";
import { ApiTags } from "@nestjs/swagger";
import { Note } from "../common/decorator/note.decorator";
import { UserRole } from "../common/entities/user.entity";

@Controller("users")
@ApiTags("Users APIs  (users)")
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {
  }
  @Post()
  @Note('Tạo mới người dùng')
  async createUsers(@Body() dto: UserCreateDto) {
    return await this.usersService.create(dto);
  }


  @Get()
  @Note('Lấy danh sách người dùng phân trang')
  async getUsersPagination(
    @Query() pagination : Pagination
  ) {
    return await this.usersService.getUsersPagination(pagination);
  }

  @Get('all')
  @Note('Lấy danh sách người dùng không phân trang')
  async getUsers() {
    return await this.usersService.getUsers();
  }


  @Put('/lock')
  @Note('Khóa hoặc mở khóa tài khoản người dùng')
  async lockUser(
    @Query("id") id: number,
    @Query("isLocked") isLocked: boolean
  ) {
    console.log(id, isLocked);
    return await this.usersService.lockUser(id, isLocked);
  }


  @Get(':id')
  @Note('Lấy thông tin người dùng theo id')
  async getUserById(
    @Query('id') id: number
  ) {
    return await this.usersService.getById(id);
  }


  @Put('/role')
  @Note('Cập nhật quyền người dùng')
  async updateUser(
    @Query("id") id: number,
    @Query("role") role: UserRole
  ) {
    return await this.usersService.updateUser(id, role);
  }



  @Delete()
  @Note('Xóa người dùng')
  async deleteUser(
    @Query("id") id: number
  ) {
    console.log(typeof id);
    return await this.usersService.deleteUser(id);
  }
}
