import { getFileData, saveFileData } from "../config/fileDataLayer";
import NewBeeperDto from "../DTO/newBeeperDto";
import Status from "../enums/status";
import Beeper from "../models/beeper";

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
    public static async updateStatus(id: number): Promise<boolean> {
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        //find beeper
        const beeper = beepers.find(beeper => beeper.id === id)
        if (!beeper || beeper.status === "detonated") return false
        //change the status
        // beeper.status = Status[Status.(beeper.status) + 1]
        return true
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