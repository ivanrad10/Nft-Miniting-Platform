import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateEventDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string

    @IsOptional()
    @IsString()
    tokenUri?: string

    constructor(name: string, address: string, tokenUri?: string) {
        this.name = name;
        this.address = address;
        this.tokenUri = tokenUri;
    }
}