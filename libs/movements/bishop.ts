import { PiecesListInterface } from "@/constants/defaultPieces"
import { getSurroundingPositions } from "@/utils/board.utils"
import { hasPiece } from "@/utils/piece.util"


export const getBishopMovement = (
    currentPiece:PiecesListInterface,
    currentPieceList:Array<PiecesListInterface>
):Array<number> => {
    /**
     * CASTLE MOVEMENT POSITIONS
     */
    const positions:Array<number> = []

    /**
     * SURROUNDING POSITIONS 
     */
    const surroundingPositions = getSurroundingPositions(currentPiece.index)


    /**
     * SURROUNDING POSITION EXCLUDING EDGES
     */
    const surroundingPositionOnlyEdges = {
        topLeft:surroundingPositions.topLeft,
        topRight:surroundingPositions.topRight,
        bottomLeft:surroundingPositions.bottomLeft,
        bottomRight:surroundingPositions.bottomRight,
    } as const

    /**
     * SET POSITION
     * @param position 
     * @param type 
     */
    const setPosition = (position:number, type:keyof typeof  surroundingPositionOnlyEdges) => {
        const directionPositions:Array<number> = [position] 

        const setDirectionPosition = (position:number) => {
            const surrounding = getSurroundingPositions(position)
            const value = surrounding[type]
            if(value || value === 0){
                directionPositions.push(value)
                setDirectionPosition(value)
            }
        }

        setDirectionPosition(position)
        
        for(let i = 0; i < directionPositions.length; i++){
            const piece = hasPiece(directionPositions[i],currentPieceList)
            if(piece){
                if(piece.color !== currentPiece.color){
                    positions.push(directionPositions[i])
                    break
                }else{
                    break
                } 
            }else{
                positions.push(directionPositions[i])
            }
        }
    }

    
    Object.keys(surroundingPositionOnlyEdges).map((keyString:any)=>{
        const key:keyof typeof  surroundingPositionOnlyEdges= keyString

        const value = surroundingPositionOnlyEdges[key]

        if(value || value === 0){
            setPosition(value,key)
        }
    })


    return positions
}