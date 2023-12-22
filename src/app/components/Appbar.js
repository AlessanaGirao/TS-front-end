import React,{ useContext, useEffect} from "react";
import { ThemeContext } from "@/app/contexts/ThemeContext"

function Appbar({onMenuToggle}) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log('atualiza appbar')
  }, [theme]);

  return (
    <div className={`flex justify-between items-center p-4
      ${theme === 'dark' ? 'bg-lime-600' : 'bg-lime-600'}
    
    `}>
      <div className={`
        ${theme === 'dark' ? 'text-white' : 'text-white'}
        font-courier font-bold 
        flex items-center 
        text-lg
      `}>
        EcoMercado Online
       <svg
          viewBox="0 0 939.787 1000"
          fill="currentColor"
          height="1em"
          width="1em"
          style={{ verticalAlign: 'middle' }} 
        >
          <path d="M236.188 204c121.333-70.667 290-92.667 506-66 112 14.667 177.333 31.333 196 50 2.667 4 2 7.333-2 10-50.667 26.667-94 63-130 109s-62 90-78 132-37.667 86-65 132-58.333 81-93 105c-92 64-219.333 65.333-382 4-44 50.667-82 109.333-114 176-8 16-23.668 18.333-47 7-23.333-11.333-31.668-24.333-25-39 29.332-66.667 72.332-131 129-193 56.667-62 115.333-113 176-153s119.333-75.333 176-106 103.667-53.333 141-68l54-20c-9.333 0-23 .333-41 1s-52.667 5.333-104 14-100.667 21.333-148 38-101.333 44.667-162 84-114.333 86.333-161 141c-14.668-161.333 43.332-280.667 174-358" />
        </svg>
      </div>
      <button onClick={onMenuToggle}>
        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
    </div>
  )
}

export default Appbar;