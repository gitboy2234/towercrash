import React, {Component} from 'react';
import './Play.css';
import Grid from '@mui/material/Grid';
import io from "socket.io-client";
import Game from "../../components/Game/Game"
import Container from '@mui/material/Container';
import bnblogo from '../../images/bnb-logo.png'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Chat from '../../components/chat/chat'

import { Label } from '@mui/icons-material';
import Towerlogo from '../../components/towerlogo/Towerlogo';
import {showCrash} from '../../components/Game/Game'


const socket = io.connect("http://localhost:3001");

class Play extends Component  {
    setUserName(event) {
        this.setState({userName: event.target.value})
    }

    updateBet(event) {
        this.setState({bet: event.target.value});

    }
    updateMultiplier(event) {
        this.setState({multiplier: event.target.value});

    }



    joinRoom = () => {
        if (this.userName !== "") {
            socket.emit("join_room");
            this.setState(prevState => ({
                showChat: !prevState.showChat
            }));
        }
    };


    handleBet() {

        //clear error state
        this.setState({errorMessage: ''});

        //first, check if bet is less than zero
        if (this.state.bet < 0) {
            this.setState({errorMessage: "bet can't be less than zero"})
        } else if (isNaN(this.state.bet)) {
            this.setState({errorMessage: "bet is not a number"})
        } else if (this.state.balance - this.state.bet < 0) {
            this.setState({errorMessage: "insufficient balance!"})
        } else {
            //good to bet now first deduct bet from balance
            var bet = this.state.bet;
            var balance = this.state.balance - bet;

         
                }
    }
    
    constructor(props) {
        super(props);

        this.state = {
            balance: 1000.00,
            multiplier: '',
            target: 4950,
            bet: '',
            errorMessage: '',
            lastRoll: '∞',
            lastTarget: '∞',
            resultColor: 'grey',
            betHistory: [],
            userName: '',
            showChat: false,
            showTower: true,
            


        };
        this.setUserName = this
            .setUserName
            .bind(this);
        this.updateBet = this
            .updateBet
            .bind(this);
            this.updateMultiplier = this
            .updateMultiplier
            .bind(this);
    }

    render() {
        return (
            <div>
            
                <Container
                    maxWidth="sm"
                    style={{
                    'marginTop': '40px'
                }}>
                    <div className='flex justify-center pb-20 '>
                        <img className='h-14 w-14 mx-4' src={bnblogo}/>
                        <div as='a' className="text-center text-3xl py-2 bg-slate-500 rounded-xl px-4">
                            {this
                                .state
                                .balance
                                .toFixed(2)}
                        </div>
                    </div>
                </Container>
                <div  className="relative justify-center text-center">
                <Game/>
                </div>
                <Container maxWidth="lg" className='relative '>
               
                    <Grid container spacing={2} className="absolute justify-center py-5 ">
                   
                        <div className='py-5' >
                            <Grid item xs={12} className=''>
                               <Towerlogo className='absolute'/>
                            </Grid>
                        </div>
                        <Grid container spacing={2} className="relative justify-center border-t-2">
                            <Grid item xs={12} lg={6}>
                                <div className='relative justify-center'>
                                    <form className=" pt-10 text-black pb-5 pl-24">
                                        <input
                                            className="w-96 h-10 my-5"
                                            type="number"
                                            name="bet"
                                            value={this.state.bet}
                                            onChange={this.updateBet}
                                            maxLength="8"
                                            placeholder="Mininum of 0.000001 BNB"></input>
                                        <span className=" bg-slate-700 py-2.5 px-3 text-white rounded-lg ml-1">BNB</span>
                                        <br/>
                                        <input
                                            className="w-96 h-10"
                                            type="number"
                                            name="multiplier"
                                            value={this.state.multiplier}
                                            onChange={this.updateMultiplier}
                                            maxLength="8"
                                            placeholder="Multiplier"></input>
                                        <span className=" bg-slate-700 py-2.5 px-3 text-white rounded-lg ml-1">x</span>
                                        <div className="pt-10 pl-14">
                                            <Button
                                                className='div-shape border-2 w-80  h-16 transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300'
                                                
                                                onClick={() => this.setState({bet: this.state.bet})}>Take Profit</Button>
                                        </div>
                                       
                                    </form>
                                    <div>
                                          
                                        </div>
                                </div>
                            </Grid>
                            <Grid item lg={6} sm={10}>
                                <div className="  h-96 rounded-md overflow-y-auto pb-2 px-2 text-black">
                                    {!this.state.showChat
                                        ? (
                                            <div className="joinChatContainer">
                                                <h3 className='text-5xl text-red-600 pb-10 pt-5 text-center pr-2'>Join A Chat</h3>
                                                <input
                                                    type="text"
                                                    className='mx-16 h-10 w-3/4 mt-3 text-black'
                                                    placeholder="Enter Username..."
                                                    onChange={this.setUserName}/>
                                                <div className='pt-5 w-60 mx-auto'>
                                                    <Button variant="contained" endIcon={< SendIcon />} onClick={this.joinRoom}>Join A Room</Button>

                                                </div>
                                            </div>
                                        )
                                        : 
                                        
                                        (<Chat socket={socket} username={this.state.userName}/>)}
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        )
    };

}
export default Play;
