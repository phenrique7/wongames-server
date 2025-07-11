import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * Custom validator to check if a password meets the following criteria:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isStrongPassword",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ...validationOptions,
      },
      validator: {
        validate(value: any, _: ValidationArguments) {
          // Check minimum length
          if (value.length < 8) {
            return false;
          }

          // Check for an uppercase letter
          if (!/[A-Z]/.test(value)) {
            return false;
          }

          // Check for a lowercase letter
          if (!/[a-z]/.test(value)) {
            return false;
          }

          // Check for number
          if (!/[0-9]/.test(value)) {
            return false;
          }

          // Check for special character
          return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
        },
      },
    });
  };
}
