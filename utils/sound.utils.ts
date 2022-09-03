/**
 * PLAY MOVE AUDIO
 */
export const playMoveSound = () => {
    const audio = new Audio('./assets/sounds/move.mp3')
    audio.play()
}


/**
 * PLAY taken AUDIO
 */
 export const playTakenSound = () => {
    const audio = new Audio('./assets/sounds/take.mp3')
    audio.play()
}


/**
 * PLAY taken AUDIO
 */
 export const playSelectSound = () => {
    const audio = new Audio('./assets/sounds/click.mp3')
    audio.play()
}