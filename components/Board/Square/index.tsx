
import React,{ PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react'
import useComputed from '@/hooks/UseComputed'
import colors, { ColorInterface } from '@/constants/colors';
import pieceTypes from '@/constants/pieceTypes';
import { ChessBoardContext } from '@/context/ChessBoardContext';
import { PiecesListInterface } from '@/constants/defaultPieces';

const Square: React.FC<PropsWithChildren<{
    color:ColorInterface,
    selected?:boolean,
    onClickHandler:()=>void,
    position:number,
    piece?:PiecesListInterface
}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children, color,selected, onClickHandler, position, piece} = props

    /**
     * CHESS BOARD CONTEXT
     */
    const {availablePositions,selectedPiece} = useContext(ChessBoardContext)

    /**
     * COMPONENT STATE
     */
    const [isDragOver, setDragOver] = useState<boolean>(false)

    /**
     * HANDLE DROP
     */
    const handleDrop = useCallback(() => {                       
        onClickHandler()
        setDragOver(false)
    },[onClickHandler])


    /**
     * GET CLASS NAME FROM COLOR
     */
    const className = useComputed(color,(color)=>{
        return color === colors.black ? 'chess-board-square--dark':'chess-board-square'
    },[]);


    /**
     * GET DRAG OVER CLASS
     */
    const getDragOverClass = useComputed(isDragOver,(isDragOver)=>{
        if(isDragOver){
            if(selectedPiece && selectedPiece.index === position){
                return ''
            }
            if(!selectedPiece || !availablePositions.includes(position)){
                return 'select-danger'
            }
        }
        return ''
    },[])


    return (
        <div 
        onDrop={handleDrop}   
        onDragOver={(event)=>{
            event.preventDefault()
            setDragOver(true)
        }}

        onDragLeave= {()=>{
            setDragOver(false)
        }}
        style={{position:'relative'}}
        className={`${className} ${selected?'selected':''} ${getDragOverClass}`} onClick={onClickHandler}>
            {
                isDragOver && piece && piece.color !== selectedPiece?.color ?
                '': children
            }
            <div className="overlay"></div>
        </div>
    )
}

export default Square