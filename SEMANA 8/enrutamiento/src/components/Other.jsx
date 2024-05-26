import React from 'react'
import {useParams} from "react-router-dom"

const OtherRoutes = () => {
  const{input} = useParams();
  const{color1} = useParams();
  const{color2} = useParams();
  return (
    <div>
      {
        color1 ?
        <p style={{color: color1, backgroundColor: color2}}>The word is: {input}</p> :
        isNaN(input) ?
        <p>The word is: {input}</p> :
        <p>The number is: {input}</p>
      }
    </div>
  )
}

export default OtherRoutes



//Other.jsx//