import React from "react";
import { useRouter } from 'next/navigation'

// Definición de las propiedades del componente Datos
interface TableProps {
    title: string;
    answer: string;
    id: number;
}    

const ShowTable:React.FC<TableProps> =({title,answer,id}) =>{
    const router = useRouter()
  
    return (
      <div className='table-content'> 
          <table border={1} >
              <thead>
                  <tr>
                      <th className="title-content">{title}  </th>
                  </tr>
              </thead>
              <hr className="hr-line"/>
              <tbody>
                  <tr className='tr-content'>
                      <td className="td-text">{answer}</td>
                      <td className='td-button'>
                          <button onClick={()=>{router.push(`registro/edit/${id}`)}}>
                            Modificar
                          </button>
                      </td>
                  </tr>  
              </tbody>
          </table>
      </div>
    )
}

export default ShowTable