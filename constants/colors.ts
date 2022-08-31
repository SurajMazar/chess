const colors = {
    black:'black',
    white:'white'
} as const


// COLOR INTERFACE
export type ColorInterface = keyof typeof colors

export default colors