import Chat from '../../components/chat/chat'
import {useEffect, useState} from "react";
import '../Play/Play.css'
import io from "socket.io-client";


const crypto = require("crypto");
const socket = io.connect("http://localhost:3001");
crypto.randomBytes(256).toString('hex');
function Play() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room");
      setShowChat(true);
    }
  };

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

    const gameHash = makeid(64) ;
    const clientSeed = "Y4tI5zsrOzdpWPwzhJFXNFtvGfJQ8FpC7kSXDt8KcIIZ755X1bNUzzaEIWPgZy8f";
    function crashPointFromHash(serverSeed) {
      const hash = crypto
        .createHmac("sha256", serverSeed)
        .update(clientSeed)
        .digest("hex");
      const hs = parseInt(100 / 5); 
      if (divisible(hash, hs)) return 1;
      const h = parseInt(hash.slice(0, 52 / 4), 16);
      const e = Math.pow(2, 52);
      return Math.floor((100 * e - h) / (e - h)) / 100.0;
    }
    function divisible(hash, mod) {
      var val = 0;
      var o = hash.length % 4;
      for (var i = o > 0 ? o - 4 : 0; i < hash.length; i += 4)
        val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
      return val === 0;
    }
    
const [counter,setCounter] = useState();
useEffect(()=>{
  if(counter > -1){
      setTimeout(()=>setCounter(counter -1),1000)
  }else{
      setCounter(8)
  }
  if(counter === 0){
    var crash = crashPointFromHash(gameHash);
    console.log("Hash:", gameHash, "--->", "Crash:", crash);
  }
   
},[counter])

    return (
      <div className="grid grid-cols-1 grid-rows-2  border-2 text-center h-full overflow-y-auto">
        <div>{counter}</div>
        <div className="grid xl:grid-cols-2 border-2 h-full">
        <div className=" border-r-2 sm:border-b-2 rounded-md pt-5 sm:pb-10 lg">
          <span className=" text-4xl">Bet at Your Own Risk!</span>
          <form className="pt-10 text-black pb-5">
            <input className="w-96 h-10" type="number" name="bet" maxLength="8" placeholder="Mininum of 0.000001 BNB">
            </input><span className=" bg-slate-700 py-2.5 px-3 text-white rounded-lg ml-1">BNB</span>
          </form>
          <form className="pt-2 text-black">
            <input className="w-96 h-10" type="number" name="bet" maxLength="8" placeholder="Multiplier">
            </input><span className=" bg-slate-700 py-2.5 px-3 text-white rounded-lg mr-6 ml-2">X</span>
          </form>
          <div className="pt-10">
          <button className='div-shape border-2 w-80  h-16 transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300' type="submit">Take Profit</button>
          </div>
        </div>
        <div className="border-r-2 sm:border-b-2 rounded-md overflow-y-auto pb-2 px-2 text-black">
          {!showChat ? (
        <div className="joinChatContainer">
          <h3 className='text-5xl text-red-600 pb-10 pt-5'>Join A Chat</h3>
          <input
            type="text"
            className='mx-5 h-10 w-3/4'
            placeholder="Enter Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
         <button className='text-white hover:scale-125 hover:text-red-700   ease-in-out ' onClick={joinRoom}>Join A Room</button>
         
        </div>
      ) : (
        <Chat socket={socket} username={username}/>
      )}
      </div>
        </div>
        </div>
    )
};
export default Play;