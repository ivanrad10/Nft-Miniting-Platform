import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Event {
    
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    address: string;

    @Prop({ required: false })
    tokenUri: string
}

export const EventSchema = SchemaFactory.createForClass(Event);