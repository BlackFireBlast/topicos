'use client'
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react"
import axios from 'axios'

type Props = {
   params:{id:''}
}

const page = (props: Props) => {
    const [data,setData] = useState({CategoryId:1,Topic:'',Answer:''})
    const [categories,setCategories] = useState([{Id:0,Category:''}])

    const getCategory = async()=>{
        try{
            const {data} = await axios.get('api/category')
            setCategories(data)     
        }catch(error){
            console.error('Error al obtener datos:',error)
        }      
    }

    useEffect(()=>{
        getCategory()
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement> )=> {  
        setData(prevState => {
            return {...data,[e.target.name]:e.target.value}
        })
    }

    const handleChangeArea = (e: ChangeEvent<HTMLTextAreaElement> )=>{
        setData(prevState =>({...data,[e.target.name]:e.target.value}) )
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement> )=>{
        const categoryId = parseInt(e.target.value)
        setData(prevState =>({...data,[e.target.name]:categoryId}) )
    }

    const handleClick = async() => {
        try{
            const res =await axios.post('api/register',data)
            if(res.status== 201){
                alert('Topic creado')  
                setData(prevState => {
                    const ob = {...data,["Answer"]:'',['Topic']:''}
                    return ob
                })
            } 
        }catch(error){
            console.error('Error al obtener datos:',error)
            alert('Algo salio mal, vuelve a intentarlo')
        } 
        
    }

    return (
        <> 
            <div className="contenedor d-flex flex-column align-items-center justify-content-center ">
                <h1>Ingresa un nuevo topico</h1>
            
                <div className="d-flex ">
                    <form className="style-form" >
                        <input onChange={handleChange} type="text" name="Topic" 
                            value={data.Topic} placeholder="Ingresa un tópico"
                            className="w-100" />
                  
                        <textarea onChange={handleChangeArea} name="Answer" 
                            value={data.Answer} placeholder="Ingresa la respuesta" 
                            rows={12} cols={50}>      
                        </textarea>
                  
                        <input onChange={handleChange} type="text" name="SubCategory" id="" placeholder="Ingresa una subcategoria"/>
                        <div className="category-with-button">
                            <select onChange={handleChangeSelect} name="CategoryId" id="">                               
                                {
                                categories.map((c) => (
                                <option value={c.Id}>{c.Category}</option>
                                ))
                                }                   
                            </select>
                            <button type="button" onClick={handleClick}>Save</button>                
                        </div>               
                    </form>
                    {props.params.id && <div>El id es:{props.params.id} </div> }
                </div>          
            </div> 
        </>
    )
}

export default page