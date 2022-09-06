
import { ColorInterface } from '@/constants/colors'
import { pieceTypeInterface } from '@/constants/pieceTypes'
import { getPieceImage } from '@/utils/piece.util'
import React,{ PropsWithChildren, useState } from 'react'

const Piece: React.FC<PropsWithChildren<{
    type:pieceTypeInterface,
    color:ColorInterface,
    clickHandler?:()=>void,
    identifier:number
}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {type,color,clickHandler, identifier} = props


    /**
     * COMPONENT STATE
     */
    const [isDragging, setDragging] = useState(false);

    /**
     * PIECE IMAGE
     */
    const pieceImage = getPieceImage(type,color)

    return (
        <div  className='chess-piece-wrapper'>

            <div className={`chess-piece`} 
                draggable={true}

                onDragStart={()=>{
                    setDragging(true)
                    if(clickHandler){
                        clickHandler()
                    }
                }}

                onDragEnd={()=>{
                    setDragging(false)
                }}

                onDragLeave={()=>{
                    setDragging(false)
                    const piece = document.getElementById(`piece-${identifier}`)!
                }}  

            >
                <div  
                    style={{
                        backgroundImage:`url(${pieceImage})`,
                        height:'50px',
                        width:'50px',
                        backgroundRepeat:'no-repeat',
                        backgroundPosition:'center'
                    }}>
                </div>
            </div>
        </div>
    )
}

export default Piece