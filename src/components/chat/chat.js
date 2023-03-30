import React, {useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import "./chat.css";

function Chat({socket, username, room}) {
    const [currentMessage,
        setCurrentMessage] = useState("");
    const [messageList,
        setMessageList] = useState([]);

    const sendMessage = async() => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList(list => [
                ...list,
                messageData
            ]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", data => {
            setMessageList(list => [
                ...list,
                data
            ]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header text-red-600 text-5xl my-5 flex justify-center">
                <p className=" align-middle">Live Chat</p>
                <span
                    className="animate-ping relative mx-2 inline-flex h-5 w-5 rounded-full bg-green-800 "></span>
            </div>

            <div className="chat-body bg-white my-2 rounded-lg">
                <ScrollToBottom className="message-container">
                    {messageList.map(messageContent => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author
                                ? "you"
                                : "other"}>
                                <div>
                                    <div className="message-meta flex">
                                        <p className="text-red-600" id="author">
                                            {messageContent.author + ":"}
                                        </p>
                                        <p className=" text-blue-800">{messageContent.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>

            <div className="chat-footer pb-5 flex">
                <input
                    className=" w-full h-10 rounded-lg"
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={event => {
                    setCurrentMessage(event.target.value);
                }}
                    onKeyPress={event => {
                    event.key === "Enter" && sendMessage();
                }}/>
                <div className="pl-2">
                    <Button
                        variant="contained"
                        endIcon={< SendIcon />}
                        className="bg-cyan-500 shadow-lg shadow-cyan-500/50 mx-2 w-20 h-10"
                        onClick={sendMessage}>
                        Send
                    </Button>

                </div>
            </div>

        </div>
    );
}

export default Chat;
