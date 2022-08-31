
import colors from '@/constants/colors'
import defaultPiecesWithPositions, { PiecesListInterface } from '@/constants/defaultPieces'
import pieceTypes from '@/constants/pieceTypes'
import useComputed from '@/hooks/UseComputed'
import { pawnMovementPositions } from '@/libs/movements'
import { getPieceByIndex } from '@/utils/piece.util'
import React,{ PropsWithChildren, useEffect, useState } from 'react'
import Piece from '../Piece'
import Square from './Square'

const Board: React.FC<PropsWithChildren<{}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children} = props

    /**
     * COMPOENENT STATE
     */
    const [selectedPiece, setSelectedPiece] = useState<PiecesListInterface|null>(null)


    /**
     * DEFAULT PIECES LIST
     */
    const [defaultList, setDefaultList] = useState(defaultPiecesWithPositions)


    /**
     * AVAILABLE POSITIONS FOR THE SELECTED PIECE TO BE ABLE TO MOVE
     */
    const availablePositions = useComputed(selectedPiece,(selectedPiece)=>{
        let positions:Array<number> = []
        if(selectedPiece){
            switch(selectedPiece.type){
                case pieceTypes.pawn:
                    positions = pawnMovementPositions(
                        selectedPiece.index,
                        selectedPiece.id,
                        selectedPiece.color,
                        defaultList
                    )
            }
        }
        return positions
    }) || []

    /**
     * IS SELECTED?
     * @param index 
     * @param piece 
     * @returns 
     */
    const isSelected = (index:number) => {
        return (index === selectedPiece?.index) || availablePositions.includes(index)
    }


    /**
     * HANDLE SQUARE CLICK
     * @param index 
     * @param piece 
     * @returns 
     */
    const handleSquareClick = (index:number, piece:PiecesListInterface | undefined) => {
        if(availablePositions.includes(index)){

            const updatedList = [...defaultList]

            if(piece){
                if(piece.color === selectedPiece?.color){
                    setSelectedPiece(piece)
                    return
                }

                if(selectedPiece){
                    const updatedSelectedPiece = {...selectedPiece}
                    const oldPieceIndex = updatedList.findIndex(item => item.index === selectedPiece.index);
                    const opponentPiece = updatedList.findIndex(item => item.index === piece.index)!;
                    if(!isNaN(oldPieceIndex)){
                        updatedSelectedPiece.index = index
                        piece.taken = true
                        updatedList[opponentPiece] = piece
                        updatedList[oldPieceIndex] = updatedSelectedPiece
                        setDefaultList(updatedList)
                        setSelectedPiece(null)
                    }
                }
            }
    
            if(selectedPiece){
                const updatedSelectedPiece = {...selectedPiece}
                const oldPieceIndex = updatedList.findIndex(item => item.index === selectedPiece.index);
                if(!isNaN(oldPieceIndex)){
                    updatedSelectedPiece.index = index
                    updatedList[oldPieceIndex] = updatedSelectedPiece
                    setDefaultList(updatedList)
                    setSelectedPiece(null)
                }
                return
            }

        }
    }





    return (
        <div className='chess-board'>
            {
                Array.from(Array(64),(e,index) => {
                    
                    // GET COLOR OF THE SQUARE
                    const getColor = () => {
                        const row = Math.floor(index/8)+1;
                        if(row%2 === 0){
                            return index%2 === 0 ? colors.white : colors.black
                        }else{
                            return index%2 === 0 ? colors.black : colors.white
                        }
                    }

                    // GET PIECE FOR INDEX
                    const piece = getPieceByIndex(defaultList,index)

                    return (
                        
                          <Square color={getColor()} selected={isSelected(index)}
                            onClickHandler={()=>{
                                handleSquareClick(index, piece)
                            }}
                            key={index}
                          >
                            {
                                piece && !piece.taken ?
                                <Piece 
                                    color={piece.color}
                                    type={piece.type}
                                    clickHandler={()=>{
                                        setSelectedPiece(piece)
                                    }}/>
                                :""
                            }
                          </Square>  
                    )
                })
            }
        </div>
    )
}

export default Board