import { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * Key features of this configuration:
 * 1. Environment-based: Uses environment variables from your file `.env`
 * 2. Development vs. Production: Different settings for different environments
 * 3. Auto-discovery: Automatically finds entities using glob patterns
 * 4. Migration support: Configured for database migrations
 * 5. SSL handling: Properly configured for production environments
 * 6. Logging: Enabled in development for debugging
 */

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USERNAME"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: configService.get<string>("NODE_ENV") === "development",
  logging: configService.get<string>("NODE_ENV") === "development",
  ssl:
    configService.get<string>("NODE_ENV") === "production" ? { rejectUnauthorized: false } : false,
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  migrationsRun: configService.get<string>("NODE_ENV") === "production",
  autoLoadEntities: true,
});
