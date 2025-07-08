import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook accha effect dene ke liye
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){ str += "0123456789"}
    if(charAllowed) { str += "!#$%&'()*+,-./:;<=>?@[]^_`{}~"}

    for (let i = 1; i <= length; i++) {
        let char= Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char);
      
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
  passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  //clickable button

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-1xl text-center mt-5 my-3 text-gray-200'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden'>
          
          <input
          type='text'
          value={password}
          className= 'w-full py-1 px-3 bg-white text-gray-500'
          readOnly
          placeholder='Password'
          ref={passwordRef}
          >
          </input>
          <button className='bg-blue-700 text-white outline-none px-1 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard} 
          >copy</button>
        </div>
        <div className='flex test-sm gap-x-2 '>
          <div className='flex items-center gap-x-1 my-4'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setlength(e.target.value)
            }}
            />
            <label>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultValue={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
            
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultValue={charAllowed}
            id='charInput'
            onChange={()=>{
              setcharAllowed((prev)=>!prev);
            }}
            />
            <label htmlFor='charInput'>Characters</label>
            
          </div>
        </div>

      </div>
    </>
  )
}

export default App;