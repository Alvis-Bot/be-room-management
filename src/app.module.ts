import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomCategoriesModule } from './room-categories/room-categories.module';
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { EventsModule } from './events/events.module';
import { AttendancesModule } from './attendances/attendances.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRootAsync({
       imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ([
            {
                rootPath: configService.get<string>("STATIC_PATH"),
                serveRoot: configService.get<string>("STATIC_URL"),
            },
        ]),
        inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
       imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USERNAME"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [`dist/**/*.entity{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
       inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
    RoomCategoriesModule,
    EventsModule,

    AttendancesModule
  ],
  controllers: [],
})
export class AppModule {}
