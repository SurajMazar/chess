import { PiecesListInterface } from '@/constants/defaultPieces'
import pieceTypes from '@/constants/pieceTypes'
import { getBishopMovement } from './bishop'
import { getCastleMovement } from './castle'
import { horseMovementPositions } from './horse'
import { getKingMovement } from './king'
import { pawnMovementPositions } from './pawn'
import { getQueenMovement } from './queen'

export {pawnMovementPositions} from './pawn'

/**
 * GET MOVING POSITIONS
 * @param piece 
 * @param piecesList 
 */
export const getMovingPositions = (piece:PiecesListInterface, piecesList:Array<PiecesListInterface>, isValidCastling:boolean = true) => {
    switch (piece.type) {
        case pieceTypes.pawn:
            return pawnMovementPositions(piece,piecesList)
        case pieceTypes.horse:
            return horseMovementPositions(piece,piecesList)
        case pieceTypes.castle:
            return getCastleMovement(piece,piecesList)
        case pieceTypes.bishop:
            return getBishopMovement(piece,piecesList)
        case pieceTypes.queen:
            return getQueenMovement(piece,piecesList)
        case pieceTypes.king:
            return getKingMovement(piece,piecesList,isValidCastling)
        default:
            return []
    }
}