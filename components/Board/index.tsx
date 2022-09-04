import { ChessBoardContext } from '@/context/ChessBoardContext'
import { getColor } from '@/utils/board.utils'
import { getPieceByIndex } from '@/utils/piece.util'
import { playSelectSound } from '@/utils/sound.utils'
import React, { PropsWithChildren, useContext } from 'react'
import Piece from '../Piece'
import Square from './Square'

const Board: React.FC<PropsWithChildren<{}>> = () => {

    /**
     * CHESS BOARD CONTEXT
     */
    const { 
        TakenBlackPieces,
        TakenWhitePieces,
        handleSquareClick,
        isSelected,
        nonTakenPieces,
        setSelectedPiece
     } = useContext(ChessBoardContext)


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
                                            type={piece.type} />
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