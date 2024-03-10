'use client'
import React, { useRef,useState } from 'react'
import './page.css'
import axios from 'axios';
import ShowTable from '../../../components/ShowTable';

function page() {
    const typeRef = useRef<string>('');//Guardará Topic,Answer, Category
    const lastSearch =useRef('')
    const searchRef = useRef<HTMLInputElement>(null);
    const [showSecondView, setShowSecondView] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [data, setData] = useState<object[]>([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [categories] = useState([{Id:0,Category:''}])

    const hasData =data.length > 0

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //Si value='' de select no se mostrara la 2da vista
        if(event.target.value){
            typeRef.current=event.target.value
            setShowSecondView(true)
        }
    }

    const getSearch = async() => {
        const {data} = await axios.get(`api/search?type=${typeRef.current}&search=${searchRef.current?.value.trim()}`)
        searchRef.current ? lastSearch.current = searchRef.current.value.trim() : ''
        setShowLoading(false)
        setData(data)
    }
    
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if(searchRef.current && searchRef.current.value ){
            let search = searchRef.current.value
            if(search.trim()===''){
                setHasError(true)
                return
            }
            setHasError(false)  
            if(searchRef.current && lastSearch.current == searchRef.current.value.trim()) return
            getSearch()
            setShowLoading(true)
        }else {
            setHasError(true)
        }
    }

    return (
        <div>
            {
                !showSecondView && (
                    <div className='search-type'>
                        <select onChange={handleChange}>
                            <option value=''>Seleccione una opción</option>
                            <option value='Topic'>Topico</option>
                            <option value='Answer'>Respuesta</option>
                            <option value='Category'>Categoria</option>
                        </select>
                    </div>
                )
            }
            {
            showSecondView && (
                <>
                    {/* //Vista si usuario selecciona Category */}
                    {typeRef.current == 'Category' ? (
                        <div>
                            {/* <select onChange={handleChangeSelect} name="CategoryId" id="">
                            {
                            categories.map((c) => (
                                <option value={c.Id}>{c.Category}</option>
                            ))
                            }               
                            </select> */}
                        </div>
                    ):(
                        <form className='search' onSubmit={handleSubmit}>
                            <div className={hasError?'input-container':""}>
                                <input className='myInput' type='text' placeholder='Ingresa una busqueda' ref={searchRef} />
                            </div>
                            <button type="submit">Buscar</button>
                        </form> 
                    )   
                    }
                
                    <div className='loading-container'>
                        {showLoading && <div>Loading... </div>}
                    </div>

                    <div className='data-container'>
                        {hasData && 
                            <ul>
                                {
                                    data.map((element: any)=>(
                                    // <li>
                                    //    <div>Topic: {element.Topic}</div>
                                    //    <div>Answer: {element.Answer}</div> 
                                    // </li>
                                        <ShowTable 
                                            title={element.Topic}
                                            answer={element.Answer}
                                            id= {element.Id}
                                        />
                                    ))
                                }                          
                            </ul>
                        }
                        {
                            !hasData && !showLoading && !hasError 
                            && searchRef.current && searchRef.current.value      
                            && <div className='noResults'>No hay resultados para esta busqueda</div>
                        }
                    </div>
                </>
            )
        }     
        </div>
    )
}

export default page