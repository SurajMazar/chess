import colors from "@/constants/colors";
import defaultPiecesWithPositions, { PiecesListInterface } from "@/constants/defaultPieces";
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
     * CHECK IF ROW DIFFERENCE IS VALID
     * @param position 
     */
    const validColDifference = (position:number) => {
        return Math.abs(getColumnFromPosition(selectedPiece.index)-getColumnFromPosition(position)) < 2
    }

    /**
     * ADD AVAILABLE POSITIONS
     */
    const addPostion = (position:number, enemy:boolean = false) => {
        if(isValidPosition(position) && validColDifference(position)){
            if(!enemy){
                const piece = hasPiece(position,currentPiecesWithPositions)
                if(!piece){
                    positions.push(position)
                }
            }else{
                const piece = hasPiece(position,currentPiecesWithPositions)
                if(piece && piece.color !== selectedPiece.color){
                    positions.push(position)
                }
            }
        }
    }


    const calculatePosition = (type:'forward'|'backward')=>{

        if(type === "forward"){
            addPostion(selectedPiece.index - 8)
            addPostion(selectedPiece.index - 7,true)
            addPostion(selectedPiece.index - 9,true)
            if(isFirstMove()){
                addPostion(selectedPiece.index - 16)   
            }
        }else{
            addPostion(selectedPiece.index + 8)
            addPostion(selectedPiece.index + 7,true)
            addPostion(selectedPiece.index + 9,true)

             if(isFirstMove()){
                addPostion(selectedPiece.index + 16)   
            }
        }

    }


    if(selectedPiece.color === colors.black){

        if(reversed){
            calculatePosition('forward')
        }else{
            calculatePosition('backward')
        }

    }else{
        if(reversed){
            calculatePosition('backward')
        }else{
            calculatePosition('forward')
        }
    }

    return positions;
}