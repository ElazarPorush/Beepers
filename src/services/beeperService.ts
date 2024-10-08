import { getFileData, saveFileData } from "../config/fileDataLayer";
import LocationDto from "../DTO/locationDto";
import NewBeeperDto from "../DTO/newBeeperDto";
import Status from "../enums/status";
import Beeper from "../models/beeper";
import BeeperUtil from "../utils/beeperUtil";

export default class BeeperService {

    //create new beeper
    public static async createNewBeeper(newBeeper: NewBeeperDto): Promise<boolean> {
        //create new beeper = object
        const { name } = newBeeper
        const beeper: Beeper = new Beeper(name)

        //add beeper to the database
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        beepers.push(beeper)
        return await saveFileData(beepers)
    }

    //get all beepers
    public static async getBeepers(): Promise<Beeper[]> {
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        return beepers
    }

    //get beepers by status
    public static async getBeepersByStatus(status: string): Promise<Beeper[]> {
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        //find match beepers
        const matchBeepers: Beeper[] = beepers.filter(beeper => beeper.status === status)
        return matchBeepers
    }

    //get beeper by id
    public static async getBeeperById(id: number): Promise<Beeper | undefined> {
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        //find beeper
        const beeper: Beeper | undefined = beepers.find(beeper => beeper.id === id)
        return beeper
    }

    //change beeper's status 
    public static async updateStatus(id: number, body: LocationDto): Promise<boolean> {
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        //find beeper
        let beeper = beepers.find(beeper => beeper.id === id)
        //check validation
        if (!beeper || beeper.status === "detonated" || (beeper.status === "shipped" && (!body || !body.latitude || !body.longitude || !BeeperUtil.checkIfInRange(body)))) {
            return false
        }
        //change the status
        const indexOfStatus = BeeperUtil.getIndex(beeper.status)
        if (!body || !body.status) {
            beeper.status = Status[indexOfStatus + 1]
        } else if (indexOfStatus + 1 === BeeperUtil.getIndex(body.status)) {
            beeper.status = body.status
        } else {
            return false
        }
        //change the location
        if (beeper.status === "deployed" || beeper.status === "detonated") {
            beeper = BeeperUtil.changeLocation(beeper, body)
        }
        //save changes
        return await saveFileData(beepers)
    }

    //delete beeper
    public static async deleteBeeper(id: number): Promise<boolean> {
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        //remove the beeper from beepers
        const newBeepers = beepers.filter(beeper => beeper.id !== id)
        return await saveFileData(newBeepers)
    }
}