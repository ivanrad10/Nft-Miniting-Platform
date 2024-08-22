import { Body, Get, Query, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./createEvent.dto";

@Controller('events')
export class EventController{
    constructor(private eventService: EventService) {}

    @Get()
    async getEvents() {
        return await this.eventService.getAll()
    }
}