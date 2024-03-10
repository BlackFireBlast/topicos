import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === 'GET'){
        const query = req.query;
        let users:any = []
        if(query.type === 'Topic'){
            users = await prisma.topic.findMany({
                where:{
                    Topic:{contains: query.search?.toString()}
                }
            })
        }else if(query.type === 'Answer'){
            users = await prisma.topic.findMany({
                where:{
                    Answer:{contains: query.search?.toString()}
                }
            })
        }
        res.status(200).json(users)
    }
    else {
        res.status(405).end()
    }
}