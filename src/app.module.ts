import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { development as sequelizeConfig } from './common/db/config';
import { User } from './modules/user/user.model';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      models: [User],
    }),
    UserModule,
  ],
})
export class AppModule {}
