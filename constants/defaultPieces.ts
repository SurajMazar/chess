import colors, { ColorInterface } from "./colors";
import pieceTypes, { pieceTypeInterface } from "./pieceTypes";

export interface PiecesListInterface {
    id:number
    index:number,
    type:pieceTypeInterface,
    color:ColorInterface,
    taken:boolean
}


const defaultPiecesWithPositions:Array<PiecesListInterface> = [
    {
        id:1,
        color:colors.black,
        index:8,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:2,
        color:colors.black,
        index:9,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:3,
        color:colors.black,
        index:10,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:4,
        color:colors.black,
        index:11,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:5,
        color:colors.black,
        index:12,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:6,
        color:colors.black,
        index:13,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:7,
        color:colors.black,
        index:14,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:8,
        color:colors.black,
        index:15,
        taken:false,
        type:pieceTypes.pawn
    },
    {
         id:9,
        color:colors.white,
        index:48,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:10,
        color:colors.white,
        index:49,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:11,
        color:colors.white,
        index:50,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:12,
        color:colors.white,
        index:51,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:13,
        color:colors.white,
        index:52,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:14,
        color:colors.white,
        index:53,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:15,
        color:colors.white,
        index:54,
        taken:false,
        type:pieceTypes.pawn
    },
    {
        id:16,
        color:colors.white,
        index:55,
        taken:false,
        type:pieceTypes.pawn
    },

    {
        id:17,
        color:colors.white,
        index:57,
        taken:false,
        type:pieceTypes.horse
    },

    {
        id:18,
        color:colors.black,
        index:1,
        taken:false,
        type:pieceTypes.horse
    },

    {
        id:19,
        color:colors.black,
        index:6,
        taken:false,
        type:pieceTypes.horse
    },

    {
        id:20,
        color:colors.white,
        index:62,
        taken:false,
        type:pieceTypes.horse
    },


    {
        id:21,
        color:colors.black,
        index:0,
        taken:false,
        type:pieceTypes.castle
    },

    {
        id:22,
        color:colors.black,
        index:7,
        taken:false,
        type:pieceTypes.castle
    },

    {
        id:23,
        color:colors.white,
        index:56,
        taken:false,
        type:pieceTypes.castle
    },

    {
        id:24,
        color:colors.white,
        index:63,
        taken:false,
        type:pieceTypes.castle
    },

    {
        id:25,
        color:colors.black,
        index:2,
        taken:false,
        type:pieceTypes.bishop
    },

    {
        id:26,
        color:colors.black,
        index:5,
        taken:false,
        type:pieceTypes.bishop
    },

    {
        id:27,
        color:colors.white,
        index:58,
        taken:false,
        type:pieceTypes.bishop
    },

    {
        id:28,
        color:colors.white,
        index:61,
        taken:false,
        type:pieceTypes.bishop
    },

    {
        id:29,
        color:colors.black,
        index:4,
        taken:false,
        type:pieceTypes.queen
    },

    {
        id:30,
        color:colors.white,
        index:60,
        taken:false,
        type:pieceTypes.queen
    },

    {
        id:31,
        color:colors.black,
        index:3,
        taken:false,
        type:pieceTypes.king
    },

    {
        id:32,
        color:colors.white,
        index:59,
        taken:false,
        type:pieceTypes.king
    },
]


export default defaultPiecesWithPositions