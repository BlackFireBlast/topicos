import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'GET'){
        const today = new Date()
        today.setHours(0, 0, 0, 0);
        const topics = await prisma.$queryRaw
            `select * from topic where DateToRepeat < ${today}` 
        res.status(200).json(topics)
    }else {
        res.status(405).end()
    }
}