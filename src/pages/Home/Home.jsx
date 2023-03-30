import '../Home/Home.css';
import {Link} from "react-router-dom"
import towerlogo from '../../images/Tower_02.png'
import bglogo from "../../images/bglogo.png"
function Home() {
    return (
        <div>
            <section>
                <main>
                    <div className='relative mt-20'>
                        <div className='text-7xl  text-center pointer-events-none'>
                            <h1 className='relative'>Tower Crash</h1>
                        </div>
                        <div>
                            <img
                                className='  left-0 right-0 absolute mx-auto top-46 z-0 animate-spin opacity-30'
                                alt="logo"
                                src={bglogo}></img>
                            <img
                                className=' h-64 left-0 right-0 relative  mx-auto top-45 z-20 floating'
                                alt="logo"
                                src={towerlogo}></img>
                        </div>
                    </div>
<div className='grid lg:grid-cols-2 md:grid-cols-1 z-30 relative text-center text-2xl grid-rows-2 mx-32 '>
    <div className=' lg:border-r-2 lg:border-b-2 pt-5 sm:border-b-2  pb-5 indent-30 mt-5 tracking-wider  ' ><span className=' text-3xl text-blue-600'>How To Play</span><p className='mt-4  div-font '>This is a gambling game, you just need to bet and cashout your money before the TOWERCRASH, BNB Coin will be used as in-Game Currency.</p></div>
    <div className=' lg:border-b-2 pb-5 indent-30 pt-5 sm:border-b-2 mt-5 tracking-wider  ' ><span className=' text-3xl text-blue-600'>Holding</span><p className='mt-2  div-font '>Every month if you hold our token you will recieved an AIRDROP based on the current liquid of the Investors Wallet and your holding of our token.</p></div>
    <div className=' lg:border-r-2 pb-5 pt-5  indent-30 sm:border-b-2  lg:border-b-0 tracking-wider ' ><span className=' text-3xl text-blue-600'>Economy</span><p className='mt-2  div-font '> The Crash Token will be our Governance Coin, That will gain BNB as long as you hold.</p></div>
    <div className=' pb-5 indent-30 pt-5 tracking-wider sm:border-b-2  lg:border-b-0 '  ><span className=' text-3xl text-blue-600'>Rug Free!</span><p className='mt-2  div-font '>This Game is a Rug Free , Because after you win you can easily withraw all your Winnings in-Game.</p></div>
    </div>

<div className='pt-10 mx-auto relative pb-5'>
<div className='   mx-auto w-80  h-16 text-center tracking-wider text-2xl hover:text-red-600  '>
<button className=' div-shape border-2 w-80  h-16 transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300'><Link to="/play">Start Playing</Link></button>
</div>
</div>
                </main>
            </section>

        </div>

    )
};

export default Home;