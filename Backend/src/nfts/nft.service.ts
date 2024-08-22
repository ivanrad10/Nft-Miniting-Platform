import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Nft } from "src/schemas/Nft.schema";
import { Model } from "mongoose";
import myNftAbi from "../myNftAbi.json"
import { client } from "../config";
import { EventsGateway } from '../webSocket/webSocketGateway';
import { EventService } from "src/events/event.service";
import { CreateEventDto } from "src/events/createEvent.dto";
import CID from "cids";

@Injectable()
export class NftService implements OnModuleInit {
    constructor(@InjectModel(Nft.name) private nftModel: Model<Nft>,
    private readonly eventService: EventService,
        private readonly eventsGateway: EventsGateway) {
        }

    async onModuleInit() {
        this.watchEvent()
    }

    async authenticateOwner(signature: `0x${string}`, message: string) {
        return await client.verifyMessage({
            address: process.env.CONTRACT_OWNER as `0x${string}`,
            message: message,
            signature
        })
    }

    async mint(tokenUri: string, owner: string) {
        
        //getting the actual tokenUri from the bytes32 tokenUri that was stored on the blockahin
        const hex = tokenUri.slice(2);
        const byteArray = new Uint8Array(hex.length / 2);
        for (let i = 0; i < byteArray.length; i++) {
            byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        const tokenURI = new CID(new Uint8Array([18, 32, ...byteArray])).toString();

        const result = await this.nftModel.findOneAndUpdate(
            { tokenUri: tokenURI},
            { $set: { owner: owner } }
        ).exec();
    }

    async getAll() {
        return this.nftModel.find().lean()
    }

    async watchEvent() {

        await client.watchContractEvent({
            address: '0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055',
            abi: myNftAbi,
            eventName: 'UserRegistered', 
            onLogs: logs => this.handleUserRegistered(logs)
        })

        await client.watchContractEvent({
            address: '0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055',
            abi: myNftAbi,
            eventName: 'UserBlackListed', 
            onLogs: logs => this.handleUserBlacklisted(logs)
        })

        await client.watchContractEvent({
            address: '0x097Bfd62302075DcD2fD4Ad364e3d14C2551B055',
            abi: myNftAbi,
            eventName: 'NftMinted', 
            onLogs: logs => this.handleNftMinted(logs)
        })
    }

    async handleUserRegistered(logs: any) {
        console.log("UserRegistered event caught...")
        const recipient = logs[0].args.user

        const newEvent = new CreateEventDto("UserRegistered", recipient)
        this.eventService.save(newEvent)

        this.eventsGateway.emitRegisterEvent();
    }

    async handleUserBlacklisted(logs: any) {
        console.log("UserBlackListed event caught...")
        let user = logs[0].args.user

        const newEvent = new CreateEventDto("UserBlackListed", user)
        await this.eventService.save(newEvent)
        this.eventsGateway.emitBlackListed();
    }

    async handleNftMinted(logs: any) {
        console.log("NftMinted event caught...")
        const recipient = logs[0].args.recipient
        let tokenUri = logs[0].args.tokenUri

        await this.mint(tokenUri, recipient)

        const newEvent = new CreateEventDto("NftMinted", recipient, tokenUri)
        this.eventService.save(newEvent)

        this.eventsGateway.emitNftMinted();
    }
}