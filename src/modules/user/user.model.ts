import { DataTypes } from 'sequelize';
import { Column, Table, Model } from 'sequelize-typescript';

import { centToUsd } from '../../common/utils/helper-functions';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.BIGINT })
  balanceInCents: string;

  @Column(DataTypes.VIRTUAL)
  get balanceInCentsBigInt() {
    return BigInt(this.balanceInCents);
  }

  @Column(DataTypes.VIRTUAL)
  get balanceInUsd() {
    return centToUsd(this.balanceInCents);
  }
}
