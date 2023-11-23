import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { AuthService } from "./auth.service";
import { User } from "../common/entities/user.entity";
import { LoginDto } from "./dto/login.dto";

export interface AuthRequest extends Request {
  user: User;
}

@Controller("auth")
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: AuthRequest,
              @Body() dto: LoginDto
  ) {
    return this.authService.login(req.user);
  }
}
