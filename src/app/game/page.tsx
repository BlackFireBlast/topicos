'use client'
import axios from 'axios'
import {useEffect, useReducer, useState,useRef} from 'react'
import countDays from '../../../components/countDays'
import { useRouter } from 'next/navigation'

const page = () => {

    const [categories,setCategories] = useState([{Id:0,Category:''}])
    const router = useRouter()
    const delayTopic = useRef(false)
    const [datosCargados, setDatosCargados] = useState(false);

    //Obtener las categorias de la base de datos
    const getCategories = async()=>{
        try {
            const {data} = await axios.get('api/category')
            setCategories(data)
            setDatosCargados(true)
        }catch(error) {
            console.error('Error al obter datos',error)
        }
        
    }

    useEffect(()=> { getCategories() },[])
    useEffect(()=> { getTopics()     },[])

    const initialState = [{
        Id:0,
        Topic:'',
        Answer:'',
        Level:2,
        DateToRepeat: new Date(),
        PreviousDateToRepeat: new Date(),
        CategoryId:0,
    }]
 
    type ActionType =   {type: 'Asignar',payload:[]}
                      | {type: 'ActualizarRadio',payload:number}
                      | {type:'delete'}

    const topicsReducer = (state: typeof initialState,action: ActionType)=> {
        switch(action.type){
            case 'Asignar':{
                return action.payload
            }

            case 'ActualizarRadio':{
                const newState = structuredClone(state)
                newState[0].Level = action.payload
                return newState
            }

            case 'delete':{
                const newState = structuredClone(state)
                newState.shift()
                return newState
            }

            default: {
                return state
            }
        }
    }

    const [topics,dispatch] = useReducer(topicsReducer,initialState )
    const hasTopics = topics?.length   

    const getTopics = async() => {
        try{
            const {data} = await axios.get('api/register')
            dispatch({
                type:'Asignar',
                payload:data,
            })
        }catch(error){
            console.error('Error obteniendo datos:',error)
        }       
    }

    const getPastTopics = async() => {
        try{
            delayTopic.current = !delayTopic.current
            if(delayTopic.current){
                const {data} = await axios.get('api/topicDelay')
                dispatch({
                    type:'Asignar',
                    payload:data,
                })
            } else {
                getTopics()
            } 
        }catch(error){
            console.error('Error obteniendo datos:',error)
        }
           
    }

    const handleClickRadio = (e: any) => {
      dispatch({
        type: 'ActualizarRadio',
        payload:parseInt( e.target.value)
      })
    }

    //Actualizar topico actual en la bd y borrar topico del reducer
    const handleNextTopic = async()=> {
        try{
            let myTopic = topics[0]
            if(delayTopic.current){
                const time = new Date()
                const time1 = new Date(myTopic.DateToRepeat)
                const time2 = new Date(myTopic.PreviousDateToRepeat)
    
                const range = time.getTime()-time1.getTime()            
                time1.setTime(time1.getTime()+range)
                time2.setTime(time2.getTime()+range)
    
                myTopic.DateToRepeat = time1
                myTopic.PreviousDateToRepeat = time2
            }   
            await  axios.put('api/register',myTopic)   
            dispatch({
                type: 'delete'
            })
        }catch(error){
            console.error('Error obteniendo datos:',error)
        }       
    }

    const handleSkipTopic = async()=> {
        dispatch({
            type: 'delete'
        })
    }
        
    const handleDelete = async(id: number) => {
        let confirmar = confirm('¿Estas seguro?')
        if(confirmar){
            try{
                let resp: any = await axios.delete("/api/register",{
                    params: {Id: topics[0].Id}}       
                )
                // .catch((error) => {
                //     console.log("catch: ", error.message)
                //     alert('Error borrando con axios')
                // })
                if(resp.statusText == 'Created'){
                    alert('Dato borrado')
                    getTopics()
                }
            }catch(error){
                console.error('Error al obtener datos:',error)
                alert('No se pudo borrar el dato, vuelve a intentar')
            }              
        }
    }

    const getDate = (date: Date ) => {
        const date2 = new Date(date)
        const dateLocal = date2.toLocaleDateString()
        return dateLocal
    }

    type typeCategory = {Id:Number,Category:string} | undefined
    const getCategory = (num: number)=> {
        const ob:typeCategory = categories.find((e)=>{
            return e.Id == num
        })
        return ob?.Category
    }
  
  return (
      <div className='d-flex flex-wrap flex-column align-items-center'>    
            {datosCargados ? (
                <div>
                {
                    hasTopics ? (
                        <div className=' d-flex flex-column align-items-center'>      
                            <div className='d-flex flex-column align-items-center' >
                                  <h2>Mis estadisticas</h2>
                                  <div className='d-flex statistics'>
                                      <ul>
                                         <li><strong>Fecha:</strong> { getDate(topics[0].DateToRepeat)} </li>
                                         <li><strong>Categoría:</strong> { getCategory(topics[0].CategoryId)} </li>
                                      </ul>
                                      <ul>
                                         <li><strong>R.E.:</strong>{countDays(topics[0].DateToRepeat,topics[0].PreviousDateToRepeat)} </li>
                                         <li><strong># de topicos:</strong> { hasTopics}</li>
                                      </ul>
                                  </div>
                            </div>
                            <form className='d-flex flex-column align-items-center'>
                                  <h2>{topics[0].Topic}</h2>
                                  <div style={{width:'700px',height:'300px'}} className='d-flex flex-column align-items-center' >
                                      <textarea className='displayAnswer' style={{backgroundColor:'black'}} value={topics[0].Answer} name="" id="" cols={50} rows={12}></textarea>
                                      <div className='game-buttons'>
                                          <input type="button" value="Next" onClick={handleNextTopic} />
                                          <input type="button" value="Pasar" onClick={handleSkipTopic} />
                                          <input type="button" value="Modify" onClick={()=>{router.push(`registro/edit/${topics[0].Id}`)}}/> 
                                          <input type="button" value="Delete" onClick={()=>{handleDelete(topics[0].Id)}} />
                                      </div>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="level" value={0}   checked={topics[0].Level==0?true:false} onClick={handleClickRadio}/>
                                      <label className="form-check-label" >
                                        No lo domino
                                      </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="level" value={1} checked={topics[0].Level==1?true:false} onClick={handleClickRadio}/>
                                      <label className="form-check-label" >
                                        Medio lo domino
                                      </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="level" value={2} checked={topics[0].Level==2?true:false} onClick={handleClickRadio} />
                                      <label className="form-check-label" >
                                        Lo domino
                                      </label>
                                  </div>         
                            </form>                   
                        </div>
                    ):(
                    <div>No hay topicos para el día de hoy</div>
                    )
                }        
                </div>
            ):(
                <p>Cargando datos...</p>
            )
            }
            <input className='input-PastTopics' type='button' onClick={getPastTopics} value= {delayTopic.current == true ? 'Upload current items' : 'Upload expired items'} />        
        
      </div>
  )
}

export default page