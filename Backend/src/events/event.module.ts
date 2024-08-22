import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/schemas/Event.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Event.name,
            schema: EventSchema
        }])
    ],
    providers: [
        EventService
    ],
    exports: [ 
        EventService
    ],
    controllers: [EventController]
})
export class EventModule {}; 