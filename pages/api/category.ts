import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {Category, Id} = req.body

    if(req.method === 'GET'){       
        const categories = await prisma.categoryTable.findMany()
        res.status(200).json(categories)
    }else if(req.method === 'POST'){
        const post = await prisma.categoryTable.create({
              data: {
                 Category
              }
        })
        res.status(201).json(post)
    }else if(req.method === 'PUT'){
        const post = await prisma.categoryTable.update({
             where: {Id:Number(Id)},
             data: {
                 Category,
             }
        })
        res.status(201).json(post)
    }else if (req.method === 'DELETE'){       
        const {Id} = req.query   
        let operacion1Exitosa = false;
        if(Id=='1') res.status(403).json({ error: 'Operación no permitida' });

        try {
           // Primera operación
           const updateCategoryId = await prisma.topic.updateMany({
            data: {
                CategoryId:1
            }
            })          
            
            operacion1Exitosa = true;      
            // Segunda operación solo si la primera fue exitosa
            if (operacion1Exitosa) {
               const post = await prisma.categoryTable.delete({
                 where: { Id:Number(Id)},
               })      
               console.log('Operaciones completadas con éxito');
               res.status(201).json(post)
            }
        }catch(error) {
            if (operacion1Exitosa) {
              console.error('Error en la segunda operación:', error);
            } else {
              console.error('Error en la primera operación:', error);
            }
        } 
    }
    else {
        res.status(405).end()
    }
}