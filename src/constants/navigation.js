import { IoSearchOutline } from 'react-icons/io5';
import {MdHomeFilled} from 'react-icons/md';
import {PiTelevisionFill} from 'react-icons/pi';
import {BiSolidMoviePlay} from 'react-icons/bi';


export  const navigation = [
    
    {
      label : "Movies",
      href: "/search",
      icon: <BiSolidMoviePlay/>
    }
]

export const mobileNav = [
  {
    label: "Home",
    href: "/",
    icon: <MdHomeFilled/>
  },
  ...navigation,
  {
    label : "search",
    href : "/search",
    icon : <IoSearchOutline/>
  }
]