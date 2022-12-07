import * as jwt from 'jsonwebtoken'
import * as Config from '../utils/config'
import 'moment/locale/th'
import moment from 'moment'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import Member from '../models/member'

export class MemberController {
    OnGetAll = async(req: any, res: any) => {
        const finding = await Member.find({ "firstname": { $regex: '.*' + "" + '.*' }});
        // const finding = await Member.findOne({firstname: /100/i})
        const loop = finding.map((data: any) => data.firstname)

        return res.status(200).json({
            status: true,
            message: 'ok',
            description: 'get data success.',
            member: loop
        })
    }
    OnRegister = async(req: any, res: any) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(404).json({
                status: false,
                message: 'error',
                errorMessage: errors.array()
            })
        }
        const { firstname, lastname, email, password } = req.body
        // image: ''
        const finding = await Member.findOne({email: email})
        if(finding){
            return res.status(400).json({
                status: false,
                message: 'error',
                description: 'email has been used.'
            })
        }
        const access_token = jwt.sign({
            firstname: firstname,
            lastname: lastname,
            email: email,
            at: new Date().getTime()
        }, `${Config.secretKey}`, { expiresIn: '600'})
        const refresh_token = jwt.sign({
            firstname: firstname,
            lastname: lastname,
            email: email,
            at: new Date().getTime(),
            token: access_token
        }, `${Config.secretKey}`)
        try {
            const member = await Member.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                access_token: access_token,
                refresh_token: refresh_token,
                password: bcrypt.hash(password, 10)
            })                
            return res.status(201).json({
                status: true,
                message: 'get data success.',
            })
        } catch (error){
            return res.status(500).json({
                status: false,
                message: 'error',
                description: 'something went wrong.'
            })
        }
    }
}