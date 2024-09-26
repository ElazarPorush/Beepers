import Status from "../enums/status"

export default class Beeper {
    public id: number
    public status: string
    public created_at: Date
    public detonated_at?: Date
    public latitude: number = 0
    public longitude: number = 0
    constructor (
        public name: string
    ) {
        this.id = +Math.random().toString().split(".")[1]
        this.status = Status[0]
        this.created_at = new Date()
    }
}