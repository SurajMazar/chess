
import { ColorInterface } from '@/constants/colors'
import { pieceTypeInterface } from '@/constants/pieceTypes'
import { getPieceImage } from '@/utils/piece.util'
import React,{ PropsWithChildren, useState } from 'react'

const Piece: React.FC<PropsWithChildren<{
    type:pieceTypeInterface,
    color:ColorInterface,
    clickHandler?:()=>void
}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {type,color,clickHandler} = props


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
            <img src={pieceImage} alt={type} className={`"chess-piece" ${isDragging?'piece-dragging':''}`} 
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
                }}
            />
        </div>
    )
}

export default Piece