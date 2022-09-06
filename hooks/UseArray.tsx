import useComputed from "@/hooks/UseComputed"
import { useState } from "react"

/**
 * USE ARRAY HOOK
 * @param array 
 * @param item 
 */
const useArrayObj = <T extends object> (array:Array<T>) => {
    
    /**
     * DEFAULT DATA STATE
     */
    const [data, setData] = useState<Array<T>>(array)
    
    /**
     * REPLACE OBJECT FROM ARRAY 
     * @param item 
     */
    const replaceObject = (item:T, key: keyof T) => {
        /**
         * OLD OBJECT INDEX
         */
        const oldObjectIndex = data.findIndex(dataItem => item[key] === dataItem[key])

        /**
         * IF IS A VALID INDEX
         */
        if(!isNaN(oldObjectIndex)){
            const updatedData = [...data]
            updatedData[oldObjectIndex] = item
            setData(updatedData)
        }
    }

    /**
     * REPLACE OBJECTS FROM ARRAY
     * @param items 
     * @param key 
     */
    const replaceObjects = (items:Array<T>, key:keyof T) => {
        
        const updatedData = [...data]; 

        items.forEach(item=>{
            /**
             * OLD OBJECT INDEX
             */
            const oldObjectIndex = data.findIndex(dataItem => item[key] === dataItem[key])

            /**
             * IF IS A VALID INDEX
             */
            if(!isNaN(oldObjectIndex)){
                updatedData[oldObjectIndex] = item
            }            
        })

        setData(updatedData)
    }

    /**
     * FILTER THE ARRAY AS PER NEED
     * @param filterFunction 
     * @returns 
     */
    function filter <U> (filterFunction:(data:Array<T>)=>U){
        return useComputed(data,filterFunction)
    }

    return {
        data,
        replaceObject,
        replaceObjects,
        filter
    }
}


export default useArrayObj