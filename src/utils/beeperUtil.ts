import { getFileData, saveFileData } from "../config/fileDataLayer";
import LocationDto from "../DTO/locationDto";
import Status from "../enums/status";
import Beeper from "../models/beeper";

export default class BeeperUtil {
    //get index of status
    public static getIndex = (status: string): number => {
        return Status[status as keyof typeof Status]
    }

    //change location
    public static changeLocation =  (beeper: Beeper, body: LocationDto): Beeper => {
        beeper.latitude = body.latitude
        beeper.longitude = body.longitude
        setTimeout(async() => {
            beeper.status = "detonated"
            beeper.detonated_at = new Date()
            //save changes at file
            let beepers = await getFileData() as Beeper[]
            if (!beepers) beepers = []
            let currBeeper = beepers.findIndex(b => b.id === beeper.id)
            beepers[currBeeper] = beeper
            await saveFileData(beepers)
        }, 10000)
        return beeper
    }

    //check if the location is in Lebanon
    public static checkIfInRange = (body: LocationDto): boolean => {
        if (body.latitude >= 33.01048 && body.latitude <= 34.6793 && body.longitude >= 35.04438 && body.longitude <= 36.59793) {
            return true
        }
        return false
    }
}