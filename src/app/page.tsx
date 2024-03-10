'use client'
import Image from 'next/image'
import styles from './page.module.css'
import {Topic} from '@prisma/client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default  function Home() {

  const [datos,setDatos] = useState<Topic[]>([])
  const hasDatos = datos?.length

  const getTopic = async() => {
      const data =await axios.get('/api/register')
      setDatos(data.data)
  }

  useEffect(()=>{
      getTopic()
  },[])

  useEffect(()=> {
      require('bootstrap/dist/js/bootstrap.bundle.min.js')
  })

  return (
    <> 
      <div className='card-container'>
          <div className="card card-links" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">Game</h5>
                <p className="card-text">Juega los topicos del día</p>
                <Link href="game" className="btn btn-primary">Go game</Link>
              </div>
          </div>
          <div className="card card-links" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">Add</h5>
                <p className="card-text">Añade tarjetas </p>
                <Link href="registro" className="btn btn-primary">Go add</Link>
              </div>
          </div>
          <div className="card card-links" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">Category</h5>
                <p className="card-text">Añadir o editar categorias</p>
                <Link href="categories" className="btn btn-primary">Go category</Link>
              </div>
          </div>
          <div className="card card-links" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">Filtros</h5>
                <p className="card-text">Encuentra una tarjeta usando filtros</p>
                <Link href="filter" className="btn btn-primary">Go filtros</Link>
              </div>
          </div>
      </div>
        
    </>  
  )
}
