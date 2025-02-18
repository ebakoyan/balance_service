import { IsInt, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

import { IsBigInt } from '../../common/validators/is-big-int';

export class UpdateBalanceDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsBigInt()
  @Transform(({ value }) => BigInt(value as number))
  amountInCents: bigint;
}
