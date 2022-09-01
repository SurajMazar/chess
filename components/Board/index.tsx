
import colors from '@/constants/colors'
import defaultPiecesWithPositions, { PiecesListInterface } from '@/constants/defaultPieces'
import pieceTypes from '@/constants/pieceTypes'
import useArrayObj from '@/hooks/UseArray'
import useComputed from '@/hooks/UseComputed'
import { pawnMovementPositions } from '@/libs/movements'
import { getColor } from '@/utils/board.utils'
import { getPieceByIndex } from '@/utils/piece.util'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import Piece from '../Piece'
import Square from './Square'

const Board: React.FC<PropsWithChildren<{}>> = (props) => {

    /**
     * COMPONENT PROPS
     */
    const { children } = props

    /**
     * SELECTED PIECE
     */
    const [selectedPiece, setSelectedPiece] = useState<PiecesListInterface | null>(null)

    /**
     * DEFAULT PIECES LIST
     */
    const { data: piecesList, replaceObject, filter, replaceObjects } = useArrayObj(defaultPiecesWithPositions)

    /**
     * NON TAKEN PIECES
     */
    const nonTakenPieces = filter((pieces) => {
        return pieces.filter(piece => !piece.taken)
    })

    /**
     * TAKEN WHITE PIECES
     */
    const TakenWhitePieces = filter((pieces) => {
        return pieces.filter(piece => piece.taken && piece.color === colors.white)
    })

    /**
     * TAKEN BLACK PIECES
     */
    const TakenBlackPieces = filter((pieces) => {
        return pieces.filter(piece => piece.taken && piece.color === colors.black)
    })


    /**
     * AVAILABLE POSITIONS FOR THE SELECTED PIECE TO BE ABLE TO MOVE
     */
    const availablePositions = useComputed(selectedPiece, (selectedPiece) => {
        let positions: Array<number> = []
        if (selectedPiece) {
            switch (selectedPiece.type) {
                case pieceTypes.pawn:
                    positions = pawnMovementPositions(selectedPiece,nonTakenPieces)
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
    const isSelected = (index: number) => {
        return (index === selectedPiece?.index) || availablePositions.includes(index)
    }


    /**
     * HANDLE SQUARE CLICK
     * @param index 
     * @param piece 
     * @returns 
     */
    const handleSquareClick = (index: number, piece: PiecesListInterface | undefined) => {
        if (availablePositions.includes(index)) {
            /**
             * IF THE AVAILABLE PATH HAS PIECE (ENEMY)
             */
            if (piece) {
                
                /**
                 * DIFFERENT PIECE IS SELECTED IN CASE OF SAME COLOR
                 */
                if (piece.color === selectedPiece?.color) {
                    setSelectedPiece(piece)
                    return
                }

                if(selectedPiece){
                    /**
                     * TAKE OPPONENT PIECE AND UPDATE POSITION
                     */
                    replaceObjects([
                        {
                            ...piece,
                            taken: true
                        },
                        {
                            ...selectedPiece,
                            index
                        }
                    ], 'id')
                }
            }else{
                if(selectedPiece){
                    /**
                     * UPDATE THE ORIGINAL PIECE POSITION
                     */
                    replaceObject({
                        ...selectedPiece,
                        index
                    }, 'id')
                }
            }
            
            setSelectedPiece(null)
        }
    }





    return (
        <div className='chess-board'>
            {
                Array.from(Array(64), (e, index) => {

                    // GET PIECE FOR INDEX
                    const piece = getPieceByIndex(nonTakenPieces, index)

                    return (

                        <Square color={getColor(index)}
                            selected={isSelected(index)}
                            onClickHandler={() => {
                                handleSquareClick(index, piece)
                            }}
                            key={index}
                        >
                            {
                                piece && !piece.taken ?
                                    <Piece
                                        color={piece.color}
                                        type={piece.type}
                                        clickHandler={() => {
                                            setSelectedPiece(piece)
                                        }} />
                                    : ""
                            }
                        </Square>
                    )
                })
            }
        </div>
    )
}

export default Board