import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NftModule } from './nfts/nft.module';
import { EventModule } from './events/event.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ceres-zadatak'),
    NftModule,
    EventModule,
    ConfigModule.forRoot({
        isGlobal: true,
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
