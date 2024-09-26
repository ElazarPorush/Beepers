import exp, { Router, Request, Response } from 'express'
import NewBeeperDto from '../DTO/newBeeperDto'
import BeepersService from '../services/beepersService'

const router: Router = exp.Router()

router.post('/', async (req: Request<any, any, NewBeeperDto>, res: Response): Promise<void> => {
    try {
        const result = await BeepersService.createNewBeeper(req.body)
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

// router.get('/', async (req: Request, res: Response): Promise<void> => {
//     try {
//         // const posts: Post[] = await PostService.getPosts()
//         res.status(200).json(posts)
//     }
//     catch (err) {
//         res.status(404).json({
//             err: true,
//             message: 'error',
//             data: null
//         })
//     }
// })

// router.get('/status/:status', async (req: Request, res: Response): Promise<void> => {
//     try {
//         // const posts: Post[] = await PostService.getPosts()
//         res.status(200).json(posts)
//     }
//     catch (err) {
//         res.status(404).json({
//             err: true,
//             message: 'error',
//             data: null
//         })
//     }
// })

// router.get('/:id', async (req: Request, res: Response): Promise<void> => {
//     try {
//         // const posts: Post[] = await PostService.getPosts()
//         res.status(200).json(posts)
//     }
//     catch (err) {
//         res.status(404).json({
//             err: true,
//             message: 'error',
//             data: null
//         })
//     }
// })

// router.put('/:id/status', async (req: Request, res: Response): Promise<void> => {
//     try {
//         // const posts: Post[] = await PostService.getPosts()
//         res.status(200).json(posts)
//     }
//     catch (err) {
//         res.status(404).json({
//             err: true,
//             message: 'error',
//             data: null
//         })
//     }
// })

// router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
//     try {
//         // const posts: Post[] = await PostService.getPosts()
//         res.status(200).json(posts)
//     }
//     catch (err) {
//         res.status(404).json({
//             err: true,
//             message: 'error',
//             data: null
//         })
//     }
// })


export default router