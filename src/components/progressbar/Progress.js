import React from "react";
import {useState, useEffect} from "react";
import "./Progress.css";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Progress = () => {
    const [counter,
        setCounter] = useState();
    useEffect(() => {
        if (counter > -1) {
            setTimeout(() => setCounter(counter - 1), 1000)

        } else {
            setCounter(8)

        }
    }, [counter])
    return (
        <div className="">
            <div className=''>
                <span className=' text-3xl my-auto '>Game Starting on {counter}</span>
                <Box sx={{
                    width: '1300%'
                }}>
                    <LinearProgress color="success" variant="determinate" value={counter}/>
                </Box>
            </div>

        </div>
    )
};
export default Progress;