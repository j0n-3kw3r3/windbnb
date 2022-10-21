import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { db } from '../db/db'
import React, { useEffect, useState } from 'react'


interface Istate {
  db: {
    city: string;
    country: string;
    superHost: boolean;
    title: string;
    rating: number;
    maxGuests: number;
    type: string;
    beds: number | null;
    photo: string;
  }[]
  filter: {
    city: string;
    country: string;
    superHost: boolean;
    title: string;
    rating: number;
    maxGuests: number;
    type: string;
    beds: number | null;
    photo: string;
}[] | undefined
}

interface props {
  dark: () => void;
  light: () => void;
  darkMode: boolean;
  // setSearchedData:(val: {}) => void
  setSearchedData: any 

}


function Header({ dark, light, darkMode, setSearchedData }: props) {
  const [state, setstate] = useState(false);
  const [guest, setGuest] = useState(0);
  const [location, setLocation] = useState('');
  const [filtered, setFiltered] = useState <Istate['filter'] > ();
  
  const [data, setData] = useState<Istate['db']>();
  useEffect(() => {
    return () => {
      setData(db);

    };
  });



  const handleChange: React.ChangeEventHandler<HTMLInputElement>  =(e)=> {
    const searchWord: string = e.target.value
    setLocation(searchWord)
    const filter = data?.filter(value => {
      return value.city.toLocaleLowerCase().includes(location?.toLowerCase())
        // || value.country.toLocaleLowerCase().includes(location?.toLowerCase())
    })
 
    if (searchWord==='') {
      setFiltered([])
    } else {
      setFiltered(filter)
    }
    
  }

  const handleGuest:  React.ChangeEventHandler<HTMLInputElement> = (e) =>{
    setGuest(parseInt(e.target.value))
  }
  const handleLocation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const loc = e.currentTarget.innerText
    setLocation(loc)
    setFiltered([])
  }


  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const submit: {
      location:string
      guest: number
    } = {
      location: location,
      guest:guest
    }

    if (guest >= 0 || guest < 10) {
      if (submit.location !== '' && submit.guest !== 0) {
        
            const filter = data?.filter(value => {
        return (
          value.city.toLowerCase().includes(submit?.location?.toLowerCase())
          &&
           submit.guest >=  value.maxGuests)
        })
     setSearchedData(filter)
      setstate(!state)
      setLocation('')
        setFiltered([])
      setGuest(0)
      }
  
      
    } 
  }


  return (
    <div className=''>
      <div className=' h-[50px] sm:h-[75px] w-full sm:p-5 px-4  py-1 md:px-16 dark:bg-header bg-light opacity-90  flex justify-between sm:items-end  items-center shadow-lg   fixed  '>
        <div className='sm:h-10 w-40  flex items-center relative  '>
          <img src='./assets/icons/logo/logo.png' alt="" srcSet="" className='  mr-2 ' />

        </div>

        <div className='flex  items-center relative'>
          {
            darkMode ?
              <FaSun className=' dark:text-light cursor-pointer hover:bg-darkborder rounded-full p-[.3rem] ' onClick={ light } size={ 30 } />
              :
              <FaMoon className=' text-dark  cursor-pointer hover:bg-darkborder rounded-full p-[.3rem]' onClick={ dark } size={ 30 } />

          }

          <div className=' shadow-lg flex text-text dark:text-light text-[.8rem] border  border-darkborder dark:border-light  rounded-lg ml-[1rem]  ' >
            <div className=' px-[1rem] py-[.5rem] border-r border-r-darkborder dark:border-r-light cursor-pointer ' onClick={()=> setstate(!state)}>Choose location</div>
            <div className=' px-[1rem] py-[.5rem] border-r border-r-darkborder dark:border-r-light cursor-pointer ' onClick={()=> setstate(!state)}>Add guest</div>
            <FaSearch className=' text-[#d63d3d]  cursor-pointer mt-[.5rem] mx-[.5rem] ' size={ 15 } onClick={()=> setstate(!state)}/>
          </div>
        </div>
      </div>

{/* search form */}
      { state &&
      
        <form className="fixed top-0 left-0 w-full dark:bg-[#363535] bg-light shadow-lg  p-[4rem]" onSubmit={ handleSubmit } >
          <div className="absolute text-[#d63d3d] top-[1.5rem] right-[4rem] cursor-pointer hover:scale-150 ease-in-out duration-[300ms] transistion " onClick={()=> setstate(!state)}>x</div>
        <div className=' shadow-lg flex justify-evenly text-text dark:text-light text-[.8rem]  dark:border-text border-[.15rem]  rounded-lg  ' >
          <div className='   border-r border-r-darkborder  flex-1 text-center relative '>

            <input type="text" placeholder='Choose location' className='dark:bg-[#363535] bg-light w-full h-full py-[1rem]  px-[1rem] ' value={ location } onChange={ handleChange } />

            { filtered  ?
              <div className="w-full bg-dark  absolute max-h-[10.8rem] overflow-hidden ">
              {
                    filtered?.slice(0, 6).map((value, id) => < div className=' cursor-pointer text-left p-[1rem] py-[.5rem]  ' key={ id }
                      onClick={ handleLocation }
                    > 
                      { value.city }
                
                    </div>
               
                )
              }
              </div>: null
          }
          </div>

          <div className='    border-r border-r-darkborder flex-1 text-center '>
            <input type="number" name="guest" placeholder='Add Guest (1 - 10)' id="" className='dark:bg-[#363535] bg-light  w-full h-full py-[1rem]  px-[1rem] ' min='1' max='10' onChange={handleGuest} />
          </div>

          <div className=" flex justify-center flex-1 ">
            <button className="bg-[#d63d3d] text-light px-[2rem] m-[.2rem] py-[.7rem] rounded-full flex"  >
              <FaSearch className='  cursor-pointer mt-[.2rem] mr-[.4rem] ' size={ 12 } />
              Search
            </button>
          </div>
        </div>

      </form>}
    </div>
  )
}

export default Header
