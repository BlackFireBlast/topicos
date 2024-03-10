import React from 'react'
import New from '../page'

type myProp = {
  params: {
    id:number
  }
}

function page(p: myProp) {
    return (
      <div>
          <New data={{id:p.params.id}} />
      </div>
    )
}

export default page