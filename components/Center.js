import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistsIdState, playlistAtomState } from '../atoms/playlistAtoms'

import { shuffle } from 'lodash'

import { ChevronDownIcon } from "@heroicons/react/outline"
import useSpotify from "../hooks/useSpotify"

const Center = () => {
  const { data: session } = useSession();
  
  const colors = [
    "from-red-500",
    "from-indigo-500",
    "from-yellow-500",
    "from-blue-500",
    "from-green-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500"
  ];

  const spotifyApi = useSpotify();

  const [playlist,setPlaylist] = useRecoilState(playlistAtomState);
  const playlistId = useRecoilValue(playlistsIdState);

  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  },[playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
    }).catch((error) => console.log("Aconteceu algo inesperado: "+error));
  },[spotifyApi, playlistId]);

  return (
    <div className='flex-grow text-white'>
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2">
          <img
            className="rounded-full w-10 h-10" 
            src={session?.user.image} 
            alt="avatar"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}>
        {/* <img src="" alt="" /> */}
        <h1>Hello</h1>
      </section>
    </div>
  );
}

export default Center