import fs from 'fs/promises'

export const getFileData = async <T> (): Promise<T[] | void> => {
    try {
        const strData: string = await fs.readFile(`${__dirname}/../../data/beepers.json`, 'utf-8')
        const parsedData: T[] = JSON.parse(strData)
        return parsedData
    }
    catch (err) {
        console.log(err);
    }
}

export const saveFileData = async <T> (data:T[]): Promise<boolean> => {
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