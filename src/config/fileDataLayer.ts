import fs from 'fs/promises'
import Beeper from '../models/beeper'

export const getFileData = async (): Promise<Beeper[] | void> => {
    try {
        const strData: string = await fs.readFile(`${__dirname}/../../data/beepers.json`, 'utf-8')
        const parsedData: Beeper[] = JSON.parse(strData)
        return parsedData
    }
    catch (err) {
        console.log(err);
    }
}

export const saveFileData = async (data:Beeper[]): Promise<boolean> => {
    try {
        const stringifiedData: string = JSON.stringify(data)
        await fs.writeFile(`${__dirname}/../../data/beepers.json`, stringifiedData, {
            encoding:'utf-8'
        })
        return true
    }
    catch (err) {
        console.log(err);
        return false
    }
}