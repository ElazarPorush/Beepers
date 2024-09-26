import exp, { Router, Request, Response } from 'express'
import NewBeeperDto from '../DTO/newBeeperDto'
import BeeperService from '../services/beeperService'
import Beeper from '../models/beeper'

const router: Router = exp.Router()

router.post('/', async (req: Request<any, any, NewBeeperDto>, res: Response): Promise<void> => {
    try {
        const result = await BeeperService.createNewBeeper(req.body)
        if (result) {
            res.status(201).json({
                err: false,
                message: 'Beeper Created',
                data: req.body
            })
        }
        else {
            throw new Error("Can't save new beeper to the file")
        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: err || 'error',
            data: null
        })
    }
})

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const beepers: Beeper[] = await BeeperService.getBeepers()
        res.status(200).json(beepers)
    }
    catch (err) {
        res.status(404).json({
            err: true,
            message: 'error',
            data: null
        })
    }
})

router.get('/status/:status', async (req: Request, res: Response): Promise<void> => {
    try {
        const beepers: Beeper[] = await BeeperService.getBeepersByStatus(req.params.status)
        res.status(200).json(beepers)
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: err,
            data: null
        })
    }
})

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper: Beeper | void = await BeeperService.getBeeperById(+req.params.id)
        if (!beeper) {
            throw new Error("can't find the beeper")
        }
        res.status(200).json(beeper)
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: err || "error",
        })
    }
})

router.put('/:id/status', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await BeeperService.updateStatus(+req.params.id)
        if (result) {
            res.status(200).json({
                err: false,
                message: 'Status Update'
            })
        }
        else {
            throw new Error("Can't update the status of this beeper")
        }
    }
    catch (err) {
        res.status(404).json({
            err: true,
            message: err || 'error'
        })
    }
})

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await BeeperService.deleteBeeper(+req.params.id)
        if (result) {
            res.status(200).json({
                err: false,
                message: 'Beeper Deleted'
            })
        }
        else {
            throw new Error("Can't Delete the beeper from the file")

        }
    }
    catch (err) {
        res.status(400).json({
            err: true,
            message: 'error',
            data: null
        })
    }
})


export default router