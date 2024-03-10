import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {Id,Topic,Answer,CategoryId,SubCategory} = req.body;
    if(req.method === 'GET'){
        const id = req.query.id
        const topics = await prisma.$queryRaw`select * from topic where Id = ${id};` 
        res.status(200).json(topics)
    }else if(req.method === 'PUT'){
        const post = await prisma.topic.update({
            where: {Id:Id},
            data: {
              Topic,
              Answer,
              CategoryId,
              SubCategory,
            }
        })
        res.status(201).json(post)
    }else {
        res.status(405).end()
    }
}