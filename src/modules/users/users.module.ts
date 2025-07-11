import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "~/modules/users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [],
  controllers: [],
})
export class UsersModule {}
