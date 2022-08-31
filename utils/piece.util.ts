import { ColorInterface } from "@/constants/colors";
import { PiecesListInterface } from "@/constants/defaultPieces";
import pieceTypes, { pieceTypeInterface } from "@/constants/pieceTypes";

export const getPieceImage = (type:pieceTypeInterface, color:ColorInterface) => {
    switch(type){
        case pieceTypes.pawn:
            return `./pieces/pawn-${color}.png`
        case pieceTypes.bishop:
            return `./pieces/bishop-${color}.png`
        case pieceTypes.castle:
            return `./pieces/castle-${color}.png`
        case pieceTypes.horse:
            return `./pieces/horse-${color}.png`
        case pieceTypes.king:
            return `./pieces/king-${color}.png`
        case pieceTypes.queen:
            return `./pieces/queen-${color}.png`
    }
}


/**
 * 
 * @param array 
 * @param index 
 * @returns 
 */
export const getPieceByIndex = (array:Array<PiecesListInterface>,index:number) => {
    return array.find(item=>(item.index === index) && (item.taken === false))
}

/**
 * CHECK IF THE POSITION IS VALID POSITION
 * @param position 
 */
export const isValidPosition = (position:number):boolean => {
    return (position >= 0) && (position <= 63) 
}

/**
 * CHECK IF THE GIVEN POSITION HAS PIECE
 * @param position 
 * @param piecesWithPosition 
 */
export const hasPiece = (position:number, piecesWithPosition:Array<PiecesListInterface>) => {
    if(piecesWithPosition){
        let piece = piecesWithPosition.find(item => item.index === position)
        return piece
    }
    return undefined
}