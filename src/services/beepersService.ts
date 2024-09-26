import { getFileData, saveFileData } from "../config/fileDataLayer";
import NewBeeperDto from "../DTO/newBeeperDto";
import Beeper from "../models/beeper";

export default class BeepersService {
    public static async createNewBeeper(newBeeper: NewBeeperDto): Promise<boolean> {
        const {name} = newBeeper
        const beeper: Beeper = new Beeper(name)
        let beepers = await getFileData() as Beeper[]
        if (!beepers) beepers = []
        beepers.push(beeper)
        return await saveFileData(beepers)
    }
}