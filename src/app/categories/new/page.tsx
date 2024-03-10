'use client'
import { useRouter } from 'next/navigation'
import {useState, ChangeEvent} from 'react'
import axios from 'axios'

type Pro = {
    data:{
        id: number | undefined
    } 
}

function page(p: Pro) {

    const [text,setText] = useState('')
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)  
    }

    const handleDelete = async ()=> {
        const confirmDelete = confirm('Deseas borrar la categoria?')
        if(confirmDelete){
            const res = await axios.delete('../../api/category',{
                params:{Id:p.data.id}
            })
            if(res.status===201){alert('Categoria borrada')}
        }else {
            alert('Borrado cancelado')
        }
    router.refresh()
    router.push('/categories')
    }

    const handleClick = async()=> {
        //Si accedo a /new, p.data sera undefined y se ejecutara else
         //Si accedo a /new/6  se llevara acabo el if 
        if(p.data && ('id' in p.data)){
            const ob= {Id:p.data.id, Category:text}
            const res = await axios.put('../../api/category',ob)
            if(res.status==201){ console.log('Estatus 201 recibido') }
           }else {
            const ob= {Category:text, Id:0}
            const res = await axios.post('../../api/category',ob)
             if(res.status==201){ console.log('Estatus 201 recibido') }
            }
            
        router.push('/categories')
    }

    return (
            <div className='create-modify-category'> 
                    <input type="text" name="Category" value={text} onChange={handleChange}/>
                    <button type="button" onClick={handleClick}>Guardar</button>
                    {p.data && <button type="button" onClick={handleDelete}>Eliminar</button> }     
            </div>
    )
}

export default page