
import React,{ PropsWithChildren } from 'react'
import useComputed from '@/hooks/UseComputed'
import colors, { ColorInterface } from '@/constants/colors';

const Square: React.FC<PropsWithChildren<{
    color:ColorInterface,
    selected?:boolean,
    onClickHandler:()=>void
}>>  = (props) => {

    /**
     * COMPONENT PROPS
     */
    const {children, color,selected, onClickHandler} = props


    /**
     * GET CLASS NAME FROM COLOR
     */
    const className = useComputed(color,(color)=>{
        return color === colors.black ? 'chess-board-square--dark':'chess-board-square'
    },[]);

    return (
        <div className={`${className} ${selected?'selected':''}`} onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Square