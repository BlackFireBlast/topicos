import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'
import countDays from "../../components/countDays";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {Id,Topic,Answer,CategoryId,SubCategory,Level,DateToRepeat,PreviousDateToRepeat} = req.body;
   
    if(req.method === 'GET'){
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today.getTime()+24*60*60*1000)
        const topics = await prisma.$queryRaw
            `select * from topic where DateToRepeat between ${today} and ${tomorrow} ;` 
        res.status(200).json(topics)
    }else if(req.method === 'POST'){
        const Level = 0
        const DateToRepeat = new Date()
        const PreviousDateToRepeat = new Date()
        const post = await prisma.topic.create({
            data: {
                Topic,
                Answer, 
                SubCategory,
                Level,
                DateToRepeat,
                PreviousDateToRepeat,
                CategoryId,
             }
        })
        res.status(201).json(post)
    }else if(req.method === 'PUT'){
        let numDays = countDays(DateToRepeat,PreviousDateToRepeat)   
        let newPeriod = 0
        if(Level == 0 && numDays != 0){
            newPeriod=numDays
        }else{
            if(numDays == 0){newPeriod=1}
            else if(numDays >0 && numDays<=2){newPeriod=7}
            else if(numDays >2 && numDays<=8){newPeriod=16}
            else if(numDays >8 && numDays<=17){newPeriod=35}
            else if(numDays >17 && numDays<=36){newPeriod=60}
            else if(numDays >36 && numDays<=61){newPeriod=90}
            else if(numDays >61 && numDays<=91){newPeriod=120}
            else if(numDays >91 && numDays<=121){newPeriod=150}
            else if(numDays >121){newPeriod=180}
        }
        const newDate = new Date()
        newDate.setTime(newDate.getTime()+ newPeriod*24*60*60*1000)
        const post = await prisma.topic.update({
            where: {Id:Id},
            data: {
                Level,
                DateToRepeat:newDate,
                PreviousDateToRepeat:DateToRepeat,
            }
         })
        res.status(201).json(post)
    }else if (req.method === 'DELETE'){
        const {Id} = req.query
        const postId = typeof Id === 'string' ? parseInt(Id) : Array.isArray(Id) ? parseInt(Id[0]) : Id
        const post = await prisma.topic.delete({
           where: { Id:postId},
        })
        res.status(201).json(post)      
    }
    else {
        res.status(405).end()
    }
}