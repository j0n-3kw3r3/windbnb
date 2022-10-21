import { useEffect, useState } from 'react';
import './App.css';
import { db } from './db/db'
import Header from './components/Header';
import {FaStar} from 'react-icons/fa'


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

}



function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchedData, setSearchedData] = useState<Istate['db']>();
  const [data, setData] = useState<Istate['db']>();

useEffect(() => {
  return () => {
    setData(db)
  };
});
  
  const checkFn = () => {
     if (localStorage.theme ==='dark' || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme:dark)"))) {
      document.querySelector('html')?.classList.add('dark')
      setDarkMode(true)
    } else {
       document.querySelector('html')?.classList.remove('dark')
         setDarkMode(false)
    }
  
  }

  
  useEffect(() => {
    return () => {
      checkFn()
    };
  }, [darkMode]);
  
  
  
  
  const dark = () => {
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
    const light = () => {
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    }
  

  

 
    

 
  return (
    <div className=" bg-light dark:bg-dark min-h-[100vh] ">
      <Header darkMode={ darkMode } dark={ dark } light={ light } setSearchedData={ setSearchedData } />


      <div className=" md:px-[5%] px-[10%]  py-[4rem] dark:text-light ">
          <h1 className=' my-[1rem] text-[1.4rem] '>All stays</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[2rem] gap-y-[4rem]">
          { searchedData ?
            searchedData?.map((value, id) =>

               <div key={id} className=" shadow-lg rounded-xl" >
            <div className="w-full md:h-[14rem] h-[18rem]  rounded-xl  overflow-hidden ">
          <img src={value.photo} alt="" srcSet="" className=' w-full h-full cover' />
            </div>
            <div className="w-full flex py-[.8rem] text-[.75rem] justify-between px-[1rem] text-text ">
              <div className='flex'>

             {value.superHost && <p className="rounded-full border px-[.5rem] py-[.2rem] mr-[1rem] ">superHost</p>}
              <p className="  pt-[.3rem] "> {value.type} - {value.beds} beds</p>
              </div>
              <div className='flex  '>
                <FaStar className='mr-[.3rem] pt-[.2rem] text-[#d63d3d] ' size={14} /> {value.rating}
              </div>
            </div>
            <p className='text-[1.2rem] px-[1rem] mb-[1rem] '>{value.title}</p>

          </div>

            ) : 
            data?.map((value, id) =>

               <div key={id} className=" shadow rounded-xl" >
            <div className="w-full md:h-[14rem] h-[18rem]  rounded-3xl  overflow-hidden ">
          <img src={value.photo} alt="" srcSet="" className=' w-full h-full cover' />
            </div>
            <div className="w-full flex py-[.8rem] text-[.75rem] justify-between px-[1rem] text-text ">
              <div className='flex'>

             {value.superHost && <p className="rounded-full border px-[.5rem] py-[.2rem] mr-[1rem] ">superHost</p>}
              <p className="  pt-[.3rem] "> {value.type} - {value.beds} beds</p>
              </div>
              <div className='flex  '>
                <FaStar className='mr-[.3rem] pt-[.2rem] text-[#d63d3d] ' size={14} /> {value.rating}
              </div>
            </div>
            <p className='text-[1.2rem] px-[1rem] mb-[1rem] '>{value.title}</p>

          </div>

            )
}
         

        </div>
      </div>
    </div>
  );
}

export default App;
