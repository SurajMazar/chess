import { PiecesListInterface } from "@/constants/defaultPieces";
import { getSurroundingPositions } from "@/utils/board.utils";
import { hasPiece, isValidPosition } from "@/utils/piece.util";

export const horseMovementPositions = (
    selectedPiece:PiecesListInterface,
    currentPiecesWithPositions:Array<PiecesListInterface>,
) => {
     /**
     * POSITION AVAILABLE FOR SELECTED PAWN PIECES
     */
    let positions:Array<number> = []

    /**
     * SURROUNDING POSITIONS
     */
    const surroundingPositions = getSurroundingPositions(selectedPiece.index)

    /**
     * 
     * @param position ADD POSITION IF EXISTS
     */
    function addPosition(position:number | undefined | false){
        if(position || position === 0){
            const positionPiece = hasPiece(position,currentPiecesWithPositions)

            if(!positionPiece){
                positions.push(position)
            }

            if(positionPiece && positionPiece.color !== selectedPiece.color){
                positions.push(position)
            }
        }
    }

    /**
     * GET HORSE MOVEMENT POSITIONS
     * @param edgePosition 
     */
    const addPositionFromEdges = (edgePosition:number|undefined|false,horizontal:'left'|'right', vertical:'top'|'bottom') => {
        if(edgePosition && isValidPosition(edgePosition)){
            const surroundingPos = getSurroundingPositions(edgePosition)

            if(vertical === 'top'){
                addPosition(surroundingPos.top)
            }else{
                addPosition(surroundingPos.bottom)
            }
            
            if(horizontal === 'left'){
                addPosition(surroundingPos.left)
            }else{
                addPosition(surroundingPos.right)
            }

        }
    }

    addPositionFromEdges(surroundingPositions.topLeft,'left','top')
    addPositionFromEdges(surroundingPositions.bottomLeft,'left','bottom')
    addPositionFromEdges(surroundingPositions.topRight,'right','top')
    addPositionFromEdges(surroundingPositions.bottomRight,'right','bottom')

    return positions
}