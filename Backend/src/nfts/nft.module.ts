import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nft, NftSchema } from '../schemas/Nft.schema'
import { NftService } from './nft.service';
import { NftController } from './nft.contoller';
import { EventsGateway } from '../webSocket/webSocketGateway';
import { EventModule } from 'src/events/event.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Nft.name,
            schema: NftSchema
        }]),
        EventModule
    ],
    providers: [
        NftService,
        EventsGateway
    ],
    controllers: [NftController]
})
export class NftModule {}; 