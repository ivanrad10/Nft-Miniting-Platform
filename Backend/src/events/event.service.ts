import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Event } from "src/schemas/Event.schema";
import { Model } from "mongoose";
import { CreateEventDto } from "./createEvent.dto";

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

    async save(createEventDto: CreateEventDto) {
        const newTokenUri = new this.eventModel(createEventDto);
        return newTokenUri.save()
    }

    async getAll() {
        return this.eventModel.find().lean()
    }
}