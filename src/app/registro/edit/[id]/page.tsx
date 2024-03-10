'use client'
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"

type Props = {
    params:{id:''}
}

const page = (props: Props) => {
    const [data,setData] = useState({Topic:'',Answer:'',SubCategory:'',CategoryId:0})
    const [categories,setCategories] = useState([{Id:0,Category:''}])
    const router = useRouter()
    const [datosCargados, setDatosCargados] = useState(false);


    const getCategory = async()=>{
        try{
            const {data} = await axios.get('../../api/category')
            setCategories(data)
            setDatosCargados(true)
        }catch(error){
            console.error('Error al obtener datos:',error)
        }       
    }

    useEffect(()=>{
        getCategory()
    },[])

    const getDataId = async()=>{
        try{
            const id = props.params.id
            const {data} = await axios.get(`../../api/dataId?id=${id}`)
            setData(data[0]) 
        }catch(error){
            console.error('Error al obtener datos:',error)
        }           
    }

    useEffect(()=>{
        getDataId()
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
        setData(prevState =>({...data,[e.target.name]:categoryId}))
    }

    const handleClick = async() => {
        try{
            const res =await axios.put('../../api/dataId',data)
            router.push('/game')
        }catch(error){
            console.error('Error al obtener datos:',error)
        }       
    }

    return (
        <> 
            <div className="contenedor d-flex flex-column align-items-center justify-content-center ">
                <h1>Editar topico con Id:{props.params.id} </h1>
                {
                    datosCargados ? (
                        <div className="d-flex ">
                    <form  className="style-form">
                        <input onChange={handleChange} type="text" name="Topic"
                        placeholder="Ingresa un tópico"
                        className="w-100" value = {data.Topic}
                          />
                        <textarea onChange={handleChangeArea} name="Answer"
                            placeholder="Ingresa la respuesta" rows={12} cols={50}
                            defaultValue = {data.Answer} >      
                        </textarea>

                        <input onChange={handleChange} type="text" name="SubCategory"
                        placeholder="Ingresa una subcategoria"
                        value={data.SubCategory}/>
                        <div className="category-with-button">
                                <select onChange={handleChangeSelect} name="CategoryId">                           
                                    {
                                    categories.map((c) => (
                                        <option value={c.Id} selected = {(c.Id)==data.CategoryId ? true :false}>
                                            {c.Category}
                                        </option>
                                    ))
                                    }                        
                                </select>                      
                                <button type="button" onClick={handleClick}>Actualizar</button>   
                        </div>                     
                    </form>
                    {/* {props.params.id && <div>El id es:{props.params.id} </div> } */}
                        </div> 
                    ):(
                        <p>Cargando datos...</p>
                    )
                }                             
            </div>            
        </>
    )
}

export default page