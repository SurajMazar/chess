import colors from "@/constants/colors";
import defaultPiecesWithPositions, { PiecesListInterface } from "@/constants/defaultPieces";
import { getSurroundingPositions } from "@/utils/board.utils";
import { isNumber } from "@/utils/heplers.utils";
import { getColumnFromPosition, hasPiece, isValidPosition } from "@/utils/piece.util";

export const pawnMovementPositions = (
    selectedPiece:PiecesListInterface,
    currentPiecesWithPositions:Array<PiecesListInterface>,
    reversed:boolean = false) => {
    
    /**
     * POSITION AVAILABLE FOR SELECTED PAWN PIECES
     */
    let positions:Array<number> = []


     /**
     * IS FIRST MOVE
     */
      const isFirstMove = () => {
        const piece = defaultPiecesWithPositions.find(piece => piece.id === selectedPiece.id)!
        return piece?.index === selectedPiece.index
    }

    /**
     * SURROUNDING POSITIONS
     */
    const surroundings = getSurroundingPositions(selectedPiece.index);

    /**
     * 
     * @param position 
     * @param enemy 
     */
    const addPosition = (position:number|undefined|false,enemy:boolean = false) => {
        if((position || position === 0) && isValidPosition(position)){
            const piece = hasPiece(position ,currentPiecesWithPositions)
          if(enemy){
            if(piece && (piece?.color !== selectedPiece.color)){
                positions.push(position)
            }
          }else{
            if(!piece){
                positions.push(position);
                firstMoveAcception(position)
            }
          } 
        }
    }

    /**
     * FIRST MOVE EXCEPTION
     * @param position 
     */
    const firstMoveAcception = (position:number)=>{
        if(isFirstMove()){
            const surroundingsPos = getSurroundingPositions(position)
            if(selectedPiece.color === colors.white){
                if(
                    (surroundingsPos.top && isNumber(surroundingsPos.top)) 
                    && !hasPiece(surroundingsPos?.top,currentPiecesWithPositions)){
                    positions.push(surroundingsPos.top)
                }
            }else{
                if((surroundingsPos.bottom && isNumber(surroundingsPos.bottom)) 
                    && !hasPiece(surroundingsPos?.bottom,currentPiecesWithPositions)){
                    positions.push(surroundingsPos.bottom)
                }
            } 
        }
    }
    
    if(selectedPiece.color === colors.black){
        addPosition(surroundings?.bottom)
        addPosition(surroundings?.bottomLeft,true)
        addPosition(surroundings?.bottomRight,true)
    }else{
        addPosition(surroundings?.top)
        addPosition(surroundings?.topLeft,true)
        addPosition(surroundings?.topRight,true)
    }

    return positions;
}