import React from "react";
import {useState, useEffect} from "react";
import "./Game.css";
import Progress from '../progressbar/Progress'

var crypto = require('crypto');
function Game() {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const gameHash = makeid(64);
    const clientSeed = "Y4tI5zsrOzdpWPwzhJFXNFtvGfJQ8FpC7kSXDt8KcIIZ755X1bNUzzaEIWPgZy8f";
    function crashPointFromHash(serverSeed) {
        const hash = crypto
            .createHmac("sha256", serverSeed)
            .update(clientSeed)
            .digest("hex");

        const hs = parseInt(100 / 5);
        if (divisible(hash, hs)) 
            return 1;
        
        const h = parseInt(hash.slice(0, 52 / 4), 16);
        const e = Math.pow(2, 52);
        return Math.floor((100 * e - h) / (e - h)) / 100.0;
    }

    function divisible(hash, mod) {
        var val = 0;
        var o = hash.length % 4;
        for (var i = o > 0
            ? o - 4
            : 0; i < hash.length; i += 4) 
            val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
        return val === 0;

    }

    const [showCrash,
        setShowCrash] = useState(true);

    const [crashCounter,
        setCrashCounter] = useState(0);

    const [counter,
        setCounter] = useState();

    const [intervalId,
        setIntervalId] = useState(null);

    const [count,
        setCount] = useState(0);

    var crash = crashPointFromHash(gameHash);


    useEffect(() => {
        if (counter > -1) {
            setTimeout(() => setCounter(counter - 1), 1000)

        } else {
            setCounter(8)

        }
        if (counter === 0) {
            console.log("Hash:", gameHash, "--->", "Crash:", crash);
            setCrashCounter(crash)
            setShowCrash(false)

        } else {
            setShowCrash(true)
        }

        return () => clearTimeout(counter);
    }, [counter])




    

    return (
        <div className="relative h-full ">
            <div>
                <div
                    className={showCrash
                    ? 'relative'
                    : 'hide'}>
                    <Progress/>
                </div>
                <div>
                    <span
                        className={showCrash
                        ? 'hide absolute'
                        : ' text-5xl absolute pt-44 left-0 right-0 z-10'}>{count}x

                    </span>
                </div>
            </div>
        </div>
    );
}

export default Game;