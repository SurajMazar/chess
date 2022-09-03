
import colors from '@/constants/colors'
import defaultPiecesWithPositions, { PiecesListInterface } from '@/constants/defaultPieces'
import useArrayObj from '@/hooks/UseArray'
import useComputed from '@/hooks/UseComputed'
import { getMovingPositions } from '@/libs/movements'
import { getColor } from '@/utils/board.utils'
import { getPieceByIndex } from '@/utils/piece.util'
import { playMoveSound, playSelectSound, playTakenSound } from '@/utils/sound.utils'
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
    const { replaceObject, filter, replaceObjects } = useArrayObj(defaultPiecesWithPositions)

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
        if (selectedPiece) {
            return getMovingPositions(selectedPiece,nonTakenPieces)
        }
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
                    playMoveSound()
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
                    playTakenSound()
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
                    playMoveSound()
                }
            }
            
            setSelectedPiece(null)
        }
    }





    return (
        <div className='play-area'>

            <div className="taken-pieces-top">
                {
                    TakenWhitePieces.map(piece=>(
                        <div key={piece.id} className="taken-piece-container">
                            <Piece type={piece.type} color={piece.color}/>
                        </div>
                    ))
                }
            </div>

            <div className="taken-pieces-bottom">
                {
                    TakenBlackPieces.map(piece=>(
                        <div key={piece.id} className="taken-piece-container">
                            <Piece type={piece.type} color={piece.color}/>
                        </div>
                    ))
                }
            </div>

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
                                    piece?
                                        <Piece
                                            color={piece.color}
                                            type={piece.type}
                                            clickHandler={() => {
                                                setSelectedPiece(piece)
                                                playSelectSound()
                                            }} />
                                        : ""
                                }
                            </Square>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Board