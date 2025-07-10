import { Transform } from "class-transformer";
import {
  IsUrl,
  IsEnum,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from "class-validator";
import { AuthProvider } from "~/common/enums/auth.enum";
import { IsStrongPassword } from "~/common/decorators/is-strong-password.decorator";

export class CreateUserDto {
  @IsEmail()
  @MaxLength(254) // RFC 5321 email length limit
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @IsStrongPassword()
  password?: string;

  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @ValidateIf((o) => o.provider === AuthProvider.GITHUB)
  @IsNotEmpty({ message: "Provider ID is required for GitHub provider" })
  @IsString()
  providerId?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
