import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const roboto = Roboto({
  weight:["300","400","500","700"],
  style
  :["italic","normal"],
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* <nav>
          <ul className='layout d-flex justify-content-start align-items-center'>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/game'>Game</Link></li>
            <li><Link href='/registro'>Registro</Link></li>
            <li><Link href='/categories'>Categorias</Link></li>
            <li><Link href='/filter'>Filtros</Link></li>
          </ul>
        </nav> */}
        <nav className="navbar navbar-expand-md ">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
                              
                                <Link className="navbar-brand d-none d-md-block" href='/'>
                                    <img src="favicon.ico" width="75" height='75' alt="Logo de la página web" />
                                </Link>
                                {/* Quitar las clases de ul no necesarias para que no haya 
                                problemas al usar flex en el nav */}
                                <ul className="navbar-nav d-flex justify-content-center align-items-center ">
                                    <li className="nav-item">
                                        <Link className="nav-link " aria-current="page" href='/game'>Game</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href='/registro'>Registro</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href='/categories'>Categorias</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href='/filter'>Filtros</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
        </nav>

        {children}
      </body>
    </html>
  )
}
