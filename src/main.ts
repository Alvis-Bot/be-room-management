import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerConfig } from "./common/config/swagger.config";
import { HttpExceptionFilter } from "./exception/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  if (configService.get<string>("NODE_ENV") === "dev") {
    SwaggerConfig.init(app);
  }


  // app.setGlobalPrefix("api", { exclude: [""] });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  // cấu hình Serialization global nestjs class-transforms để ẩn các dữ liệu nhảy cảm truớc khi gửi về cho khách
  // -----  không được gửi password về
  // -----  @Exclude() trong entity
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(configService.get("PORT"), () => {
    Logger.log(
      `Listening at http://localhost:${configService.get<number>("PORT")}`
    );
    Logger.log(
      "Swagger UI is available at http://localhost:" + configService.get<number>("PORT") + "/api"
    );
    Logger.log(
      "Running in environment " + configService.get<string>("NODE_ENV")
    );
  });

}

bootstrap();
