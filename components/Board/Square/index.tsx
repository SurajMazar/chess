
import React,{ PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react'
import useComputed from '@/hooks/UseComputed'
import colors, { ColorInterface } from '@/constants/colors';
import pieceTypes from '@/constants/pieceTypes';
import { ChessBoardContext } from '@/context/ChessBoardContext';

const Square: React.FC<PropsWithChildren<{
    color:ColorInterface,
    selected?:boolean,
    onClickHandler:()=>void,
    position:number
}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children, color,selected, onClickHandler, position} = props

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
        onDragOver={(event)=>{
            event.preventDefault()
            setDragOver(true)
        }}

        onDragLeave= {()=>{
            setDragOver(false)
        }}
        
        onDrop={handleDrop}   
        className={`${className} ${selected?'selected':''} ${getDragOverClass}`} onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Square