import colors, { ColorInterface } from "@/constants/colors";
import defaultPiecesWithPositions, { castelingPositionLeft, castelingPositions, PiecesListInterface } from "@/constants/defaultPieces";
import pieceTypes from "@/constants/pieceTypes";
import useArrayObj from "@/hooks/UseArray";
import useComputed from "@/hooks/UseComputed";
import { getMovingPositions } from "@/libs/movements";
import { getSurroundingPositions } from "@/utils/board.utils";
import { hasPiece } from "@/utils/piece.util";
import { playMoveSound, playSelectSound, playTakenSound } from "@/utils/sound.utils";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";

/**
 * CHESS BOARD CONTEXT iNTERFACE
 */
interface ChessBoardContextInterface {
    selectedPiece: PiecesListInterface | null,
    setSelectedPiece: Dispatch<SetStateAction<PiecesListInterface | null>>,
    handleSquareClick: (index: number, piece: PiecesListInterface | undefined) => void,
    isSelected: (index: number) => boolean,
    availablePositions: Array<number>,
    nonTakenPieces: Array<PiecesListInterface>,
    TakenBlackPieces: Array<PiecesListInterface>,
    TakenWhitePieces: Array<PiecesListInterface>
}

/**
 * CHESSBOARD CONTEXT
 */
export const ChessBoardContext = createContext<ChessBoardContextInterface>({} as ChessBoardContextInterface)


/**
 * CHESS BOARD PROVIDER WRAPPER
 */
const ChessBoardProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

    /**
     * SELECTED PIECE
     */
    const [selectedPiece, setSelectedPiece] = useState<PiecesListInterface | null>(null)

    /**
     * TURNS
     * FIRST MOVE IS FOR WHITE
     */
    const [turn, setTurn] = useState<boolean>(false)

    /**
     * DEFAULT PIECES LIST
     */
    const { data: chessPieces, replaceObject, filter, replaceObjects } = useArrayObj(defaultPiecesWithPositions)

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
            return getMovingPositions(selectedPiece, nonTakenPieces)
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
     * HANDLE CASTLING
     * @param position 
     */
    const handleCastlingMove = (position: number, piece: PiecesListInterface) => {
        const surroundings = getSurroundingPositions(position)
        const castelingPieceDir = castelingPositionLeft.includes(position) ? 'left' : 'right'
        let castlingPieceIndex = surroundings[castelingPieceDir]
        const castlingPieceFinalPositionDir = castelingPositionLeft.includes(position) ? 'right' : 'left'
        const castlingPieceFinalPosition = surroundings[castlingPieceFinalPositionDir]

        if (castlingPieceIndex || castlingPieceIndex === 0) {
            /**
             * CORRECTION FACTOR FOR RIGHT DIRECTION
             */
            if(castelingPieceDir === 'right'){
                castlingPieceIndex = castlingPieceIndex +1;
            }
            const castelingPiece = hasPiece(castlingPieceIndex, nonTakenPieces)
            if (castelingPiece && castelingPiece.type === pieceTypes.castle) {
                if (castlingPieceFinalPosition || castlingPieceFinalPosition === 0) {
                    replaceObjects(
                        [
                            {
                                ...castelingPiece,
                                index: castlingPieceFinalPosition
                            },
                            {
                                ...piece,
                                index: position
                            },
                        ]
                        , 'id')
                }
            }
        }
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

                if (selectedPiece) {
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
            } else if (castelingPositions.includes(index) && selectedPiece && selectedPiece.type === pieceTypes.king){
                handleCastlingMove(index, selectedPiece)
                playMoveSound()
            } else {
                if (selectedPiece) {
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
        }else { // WHEN IVALID LOCATION SELECTED
            if (piece) { // IF IVALID LOCATION HAS A PIECE

                if (turn) {
                    if (piece.color === colors.white) {
                        setSelectedPiece(piece)
                    }
                } else {
                    if (piece.color === colors.black) {
                        setSelectedPiece(piece)
                    }
                }

                playSelectSound()
            } else {
                setSelectedPiece(null)
            }
        }
    }

    /**
     * SWITCH TURN ON EVERY MOVE
     */
    useEffect(() => {
        setTurn(!turn)
    }, [chessPieces]) //eslint-disable-line

    return (
        <>
            <ChessBoardContext.Provider value={{
                selectedPiece,
                setSelectedPiece,
                handleSquareClick,
                isSelected,
                availablePositions,
                nonTakenPieces,
                TakenBlackPieces,
                TakenWhitePieces
            }}>
                {children}
            </ChessBoardContext.Provider>
        </>
    )
}

export default ChessBoardProvider