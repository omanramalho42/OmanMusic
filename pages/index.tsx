import type { NextPage } from 'next'

import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div>
      <main> 
        <Sidebar />
        {/* CENTER */}
      </main>

      <h1>Bem vindo ao Oman Music 😁</h1>
      
      <div>
        {/* PLAYER */}
      </div>
    </div>
  )
}

export default Home
