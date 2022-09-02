import colors from "@/constants/colors";
import { getRowFromPosition, isValidPosition } from "./piece.util";

/**
 * GET THE COLOR OF THE BOX
 * @returns 
 */
export const getColor = (index:number) => {
    const row = getRowFromPosition(index);
    if(row%2 === 0){
        return index%2 === 0 ? colors.white : colors.black
    }else{
        return index%2 === 0 ? colors.black : colors.white
    }
}


export const  edgePositions = {
    right:"right",
    left:"left"
} as const 

/**
 * 
 * @param position 
 * @returns 
 */
export const isEdgePosition = (position:number) => {
    const mod = (position+1)%8
    if(mod === 0){
        return {
            edge:true,
            type:edgePositions.right
        }
    }
    

    if(mod === 1) {
        return {
            edge:true,
            type:edgePositions.left
        }
    }

    return {
        edge:false,
        type:false
    }
}

/**
 * 
 * @param position 
 * @returns 
 */
export const getSurroundingPositions = (position:number) => {

    /**
     * POSITION INTERFACE
     */
    type positionInterface = number | false

    /**
     * SURROUNDING POSITION INTERFACE
     */
    interface surroundingPositionsInterface {
        top?:positionInterface ,
        bottom?:positionInterface
        left?:positionInterface
        right?:positionInterface
        topLeft?:positionInterface
        topRight?: positionInterface
        bottomLeft?: positionInterface
        bottomRight?: positionInterface
    }

    const surrounding:surroundingPositionsInterface = {}

    /**
     * ADD SURROUNDING POSITION
     * @param key 
     * @param position 
     */
    const addPosition = (key: keyof surroundingPositionsInterface, position:number) => {
        if(isValidPosition(position)){
            surrounding[key] = position
        }
    }
    
    /**
     * TOP POSITIONS
     */
    addPosition('top',position - 8)
    

    /**
     * BOTTOM POSITION
     */
    addPosition('bottom',position + 8)

    /**
     * TYPE OF EDGE
     */
    const edge = isEdgePosition(position)


    if(edge.type !== edgePositions.left){
        addPosition('left', position - 1)
        addPosition('topLeft', position - 9)
        addPosition('bottomLeft', position + 7)
    }
    
    if(edge.type !== edgePositions.right){
        addPosition('right', position + 1)
        addPosition('topRight', position -7)
        addPosition('bottomRight', position + 9)
    }

    return surrounding
}

