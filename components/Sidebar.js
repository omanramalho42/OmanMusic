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
import { useEffect, useState } from 'react'

import { useRecoilState } from 'recoil'
import { playlistsIdState } from '../atoms/playlistAtoms'

import useSpotify from '../hooks/useSpotify'

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
  
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [playlist, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistsIdState);
  console.log("Voce clicou na playlist id: ", playlistId);

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  },[session, spotifyApi]);

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
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
        <Separator />
        {/* PLAYLISTS */}
        {playlist.map((playlist) => (
          <p 
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className='cursor-pointer hover:text-white ml-4'
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar