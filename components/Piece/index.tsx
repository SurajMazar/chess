
import colors, { ColorInterface } from '@/constants/colors'
import { pieceTypeInterface } from '@/constants/pieceTypes'
import { ChessBoardContext } from '@/context/ChessBoardContext'
import useComputed from '@/hooks/UseComputed'
import { getPieceImage } from '@/utils/piece.util'
import React,{ PropsWithChildren, useContext, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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
     * CHESS BOARD CONTEXT
     */
    const { handleMouseMove, selectedPiece, turn} = useContext(ChessBoardContext)

    /**
     * COMPONENT STATE
     */
    const [isDragging, setDragging] = useState(false)


    /**
     * MOVING PIECE REF
     */
     const movingPieceRef = useRef<any>(undefined)


    /**
     * PIECE IMAGE
     */
    const pieceImage = getPieceImage(type,color)

    /**
     * MOVING PIECE WHILE DRAGGING
     */
    const movingPiece = useComputed(isDragging,(isDragging) => {
        return (
            <>
            {
                selectedPiece && selectedPiece.id === identifier && isDragging ?
                <div ref={movingPieceRef}  className="movingPiece"
                onDrop={e=>{
                    console.log(e);
                    
                }}>
                    <div>
                        <img src={`${pieceImage}`} alt="" style={{userSelect:'none'}}/>
                    </div>
                </div>:''
            }
            </>
        )
    },[selectedPiece])

    return (
        <>
        <div  className='chess-piece-wrapper'>
            <div className={`chess-piece ${selectedPiece && selectedPiece.id === identifier && isDragging   ?'piece-dragging':''}`} 
                draggable={turn && color===colors.white || !turn && color===colors.black}

                onDragStart={()=>{
                    setDragging(true)
                    if(clickHandler){
                        clickHandler()
                    }
                }}

                onDrag={(event)=>{
                    event.stopPropagation()
                    event.preventDefault()
                    handleMouseMove(event,isDragging,movingPieceRef)
                }}


                onDragEnd={()=>{
                    setDragging(false)
                }}

            >
                <div  
                id={`piece-${identifier}`}
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
        {movingPiece}
        </>
    )
}

export default Piece