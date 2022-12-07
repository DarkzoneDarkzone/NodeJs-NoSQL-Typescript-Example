import express from 'express'
import Member from '../models/member'
import { MemberController } from '../controllers/memberController'

const router = express.Router()
const memberController = new MemberController()

router.get('/api/member/getAll', memberController.OnGetAll)

router.post('/api/member/register', memberController.OnRegister)

router.get('/api/member/removeModel', async(req: any, res: any) => {
    const model = await Member.collection.deleteMany({})
    // await Member.collection.drop() /** for drop database */
    return res.status(200).json(model)
})

export const memberRouter = router