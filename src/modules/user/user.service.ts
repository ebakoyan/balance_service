import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.model';
import sequelize from 'sequelize';
import { UpdateBalanceDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async updateBalance(dto: UpdateBalanceDto) {
    const { userId, amountInCents } = dto;
    const transaction = await this.userModel.sequelize!.transaction();

    try {
      const user = await this.userModel.findByPk(userId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (amountInCents < 0 && user.balanceInCentsBigInt + amountInCents < 0) {
        throw new ConflictException('Insufficient funds');
      }

      await user.update(
        {
          balanceInCents: sequelize.literal(
            `"balanceInCents" + '${amountInCents}'`,
          ),
        },
        {
          transaction,
          returning: true,
        },
      );
      await transaction.commit();

      return {
        userId: user.id,
        balanceInUsd: user.balanceInUsd,
      };
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }
}
