
import { ColorInterface } from '@/constants/colors'
import { pieceTypeInterface } from '@/constants/pieceTypes'
import { getPieceImage } from '@/utils/piece.util'
import React,{ PropsWithChildren } from 'react'

const Piece: React.FC<PropsWithChildren<{
    type:pieceTypeInterface,
    color:ColorInterface,
    clickHandler:()=>void
}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {type,color,clickHandler} = props

    /**
     * PIECE IMAGE
     */
    const pieceImage = getPieceImage(type,color)

    return (
        <div className='chess-piece-wrapper' onClick={clickHandler}>
            <img src={pieceImage} alt={type} className="chess-piece"/>
        </div>
    )
}

export default Piece