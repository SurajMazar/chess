import ChessBoardProvider from '@/context/ChessBoardContext'
import type { NextPage } from 'next'
import Board from '../components/Board'

const Home: NextPage = () => {
  return (
    <ChessBoardProvider>
      <div className='game-container'>
        <Board/>
      </div>
    </ChessBoardProvider>
  )
}

export default Home
