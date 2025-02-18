import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsBigInt(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isBigInt',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'bigint';
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid BigInt`;
        },
      },
    });
  };
}
