import { 
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon,
} from '@heroicons/react/outline'

import { signOut, useSession } from 'next-auth/react'

const Separator = () => {
  return (
    <hr className='border-t-[0.1px] border-gray-900' />
  )
}

const Sidebar = () => {

  const menuOptions = [
    { title: 'Sair', icon: <LogoutIcon /> },
    { title: 'Home', icon: <HomeIcon /> },
    { title: 'Procure', icon: <SearchIcon /> },
    { title: 'Sua biblioteca', icon: <LibraryIcon /> },
    { title: 'Criar playlist', icon: <PlusCircleIcon /> },
    { title: 'Sons curtidos', icon: <HeartIcon /> },
    { title: 'Suas músicas', icon: <RssIcon /> },
  ];
  
  const { data: session, status } = useSession()
  console.log(session, 'session')

  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen'>
      <div className='space-y-4'>
        {menuOptions.map(({ title, icon }, index) => title != 'Sair' ? (
          <div key={index}>
            <button 
              className='flex items-center space-x-2 hover:text-white m-4'
            >
              <div className='h-5 w-5'>
                { icon }
              </div>
              <p> { title } </p>
            </button>
            {++index % 4 == 0 && ( <Separator /> )}
          </div>
        ) : (
          <div key={index}>
            <button 
              className='flex items-center space-x-2 hover:text-white m-4'
              onClick={() => signOut()}
            >
              <div className='h-5 w-5'>
                { icon }
              </div>
              <p> { title } </p>
            </button>
          </div>
        ))}

        {/* PLAYLISTS */}
        {['1','2','3','4','5','6','7','8'].map((i) => (
          <p key={i} className='cursor-pointer hover:text-white ml-4'> Playlist name... </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar