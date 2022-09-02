import { PiecesListInterface } from '@/constants/defaultPieces'
import pieceTypes from '@/constants/pieceTypes'
import { horseMovementPositions } from './horse'
import { pawnMovementPositions } from './pawn'

export {pawnMovementPositions} from './pawn'

/**
 * GET MOVING POSITIONS
 * @param piece 
 * @param piecesList 
 */
export const getMovingPositions = (piece:PiecesListInterface, piecesList:Array<PiecesListInterface>) => {
    switch (piece.type) {
        case pieceTypes.pawn:
            return pawnMovementPositions(piece,piecesList)
        case pieceTypes.horse:
            return horseMovementPositions(piece,piecesList)
        default:
            return []
    }
}