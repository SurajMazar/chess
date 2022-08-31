import colors, { ColorInterface } from "@/constants/colors";
import defaultPiecesWithPositions, { PiecesListInterface } from "@/constants/defaultPieces";
import { hasPiece, isValidPosition } from "@/utils/piece.util";

export const pawnMovementPositions = (
    currentPosition:number,
    id:number,
    color:ColorInterface,
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
        const piece = defaultPiecesWithPositions.find(piece => piece.id === id)!
        return piece?.index === currentPosition
    }

    /**
     * 
     */
    const addPostion = (position:number, enemy:boolean = false) => {
        if(isValidPosition(position)){
            if(!enemy){
                const piece = hasPiece(position,currentPiecesWithPositions)
                if(!piece){
                    positions.push(position)
                }
            }else{
                const piece = hasPiece(position,currentPiecesWithPositions)
                if(piece && piece.color !== color){
                    positions.push(position)
                }
            }
        }
    }


    const calculatePosition = (type:'forward'|'backward')=>{

        if(type === "forward"){
            addPostion(currentPosition - 8)
            addPostion(currentPosition - 7,true)
            addPostion(currentPosition - 9,true)
            if(isFirstMove()){
                addPostion(currentPosition - 16)   
            }
        }else{
            addPostion(currentPosition + 8)
            addPostion(currentPosition + 7,true)
            addPostion(currentPosition + 9,true)

             if(isFirstMove()){
                addPostion(currentPosition + 16)   
            }
        }

    }


    if(color === colors.black){

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