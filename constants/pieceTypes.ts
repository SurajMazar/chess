const pieceTypes = {
    pawn:'pawn',
    bishop:'bishop',
    horse:'horse',
    castle:'castle',
    queen:'queen',
    king:'king'
} as const

type pieceTypesKeysInterface = keyof typeof pieceTypes;

//Piece Type Interface
export type pieceTypeInterface = typeof pieceTypes[pieceTypesKeysInterface]

export default pieceTypes