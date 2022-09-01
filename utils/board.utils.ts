import colors from "@/constants/colors";
import { getRowFromPosition } from "./piece.util";

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