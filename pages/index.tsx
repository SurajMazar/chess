import type { NextPage } from 'next'
import Board from '../components/Board'

const Home: NextPage = () => {
  return (
    <div className='game-container'>
      <Board/>
    </div>
  )
}

export default Home
