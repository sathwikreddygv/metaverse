import { User } from "./user"

export class RoomManager {
    rooms:Map<String, User[]> = new Map()
    static instance:RoomManager

    private constructor() {
        this.rooms = new Map()
    }

    static getInstance() {
        if(!this.instance){
            this.instance = new RoomManager()
        }
        return this.instance
    }
}