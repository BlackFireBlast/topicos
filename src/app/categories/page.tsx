import Link from 'next/link'
 import axios from 'axios'
// const axios = require('axios');

type objCategory = {Id: number,Category: String}

async function page() {

    const {data} = await axios.get(`${process.env.URL}/api/category`)
    const categories: objCategory[] = data
    const hasCategory = categories?.length > 0

    return (
        <div className='main-container'>
        <Link href='/categories/new' >
            <button type="button">Añadir Categoria</button>
            </Link> 
            <div>
                {
                    hasCategory ? (
                        <ul className='list'>        
                              {
                                categories.map((element)=>(
                                    <li className='list-element'>
                                        <div>{element.Category}</div>
                                        <Link href={`/categories/new/${element.Id}`}>
                                            <button type="button">Editar</button>
                                        </Link>
                                    </li>
                                ))
                              }
                        </ul>
                    ):(
                        <div>No hay categorias</div>
                    )
                }
            </div>
        </div>
    )
}

export default page