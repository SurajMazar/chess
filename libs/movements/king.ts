import { ColorInterface } from "@/constants/colors";
import defaultPiecesWithPositions, { PiecesListInterface } from "@/constants/defaultPieces";
import pieceTypes from "@/constants/pieceTypes";
import { getSurroundingPositions } from "@/utils/board.utils";
import { hasPiece, isValidPosition } from "@/utils/piece.util";

export const getKingMovement = (
    currentPiece:PiecesListInterface,
    currentPiecesIndex:Array<PiecesListInterface>,
    isValidCastling:boolean = true
) => {

    const positions:Array<number> = []

    /**
     * SURROUNDING POSITION
     */
    const surroundings = getSurroundingPositions(currentPiece.index)

    /**
     * ADD POSITION
     * @param position 
     */
    const addPosition = (position:number|false|undefined) => {
        if((position || position === 0) && isValidPosition(position)){
            const piece = hasPiece(position,currentPiecesIndex)
            if(piece?.color !== currentPiece.color){
                positions.push(position)
            }
        }
    }

    /**
     * LOOPING AROUND POSITIONS
     */
    for(let position in surroundings){
        addPosition(surroundings[position as keyof typeof surroundings])
    }

    const castelingPosition = isValidCastling? getCastelingPosition(
        currentPiece.color,
        currentPiece.index,
        currentPiecesIndex
    ): []  

        
    return [...positions, ...castelingPosition]
}

/**
 * 
 * @param color GET CASTELING POSITION
 */
export const getCastelingPosition = (
    color:ColorInterface, 
    pieceIndex:number,
    currentPiecesList:Array<PiecesListInterface>
) => {

    const castelingPositions:Array<number> = []

    /**
     * DEFAULT POSITION OF THE KING PIECE
     */
    const defaultPiece = defaultPiecesWithPositions.find(item=> item.type === pieceTypes.king && item.color === color)!

    /**
     * SURROUNDING PIECES 
     */
    const surroundings = getSurroundingPositions(pieceIndex)

    /**
     * DIRECTIONS POSITIONS FOR CASTLING
     */
    const castlingDirs  = {
        left:surroundings.left,
        right:surroundings.right
    }
    
    const edgeIndexes = [0,7,63,56];

    /**
     * VALIDATE CASTLING POSITION
     */
    const addCastlingPosition = (position:number | false | undefined , direction:keyof typeof castlingDirs) => {
        if((position || position === 0)){
            const surroundingPos = getSurroundingPositions(position)
            const castlingPos = surroundingPos[direction] as number
            
            const validatePosition = (position:number) => {
                const surr = getSurroundingPositions(position);
                const dirPositions:Array<number> = [position]
                const dirPosition = surr[direction]

                const setDirectionPositions = (position:number|false|undefined) => {
                    if(position || position === 0){
                        dirPositions.push(position)
                        const surr = getSurroundingPositions(position);
                        const dirPosition = surr[direction]
                        setDirectionPositions(dirPosition)
                    }
                }

                setDirectionPositions(dirPosition)
                
                
                for(let i =0; i < dirPositions.length; i++){
                    const piece = hasPiece(dirPositions[i],currentPiecesList)
                    if(edgeIndexes.includes(dirPositions[i])){
                        if(piece){
                            if(piece.color === color && piece.type === pieceTypes.castle){
                                return true
                            }
                        }
                    }else{
                        if(piece){
                            return false
                        }
                    }
                }
                
                return false
            }            

            
            if((castlingPos || castlingPos === 0) && validatePosition(castlingPos)){
                castelingPositions.push(castlingPos)
            }
        }
    }

    /**
     * IF KING HAS THE SAME EARLIER POSITION
     */
    if(pieceIndex === defaultPiece.index){
        addCastlingPosition(castlingDirs.left,"left")
        addCastlingPosition(castlingDirs.right,"right")
    }

    return castelingPositions;
}