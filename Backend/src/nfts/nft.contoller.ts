import { Body, Controller, Post, Get, UnauthorizedException } from "@nestjs/common";
import { NftService } from "./nft.service";
import {client} from "../config"
import * as dotenv from 'dotenv';

@Controller('nfts')
export class NftController{
    constructor(private nftService: NftService) {
    }

    @Get()
    async getAllNfts() {
        return await this.nftService.getAll()
    }

    @Post('blacklist')
    async blacklistUser(@Body() blacklistingData: { signature: `0x${string}`, message: string }) {
        const { signature, message } = blacklistingData;

        const valid = await this.nftService.authenticateOwner(signature, message)

        if (!valid) {
            throw new UnauthorizedException('Only the contract owner can blacklist!');
        }
        return valid
    }
}