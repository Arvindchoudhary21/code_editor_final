import React, { useState, useRef, useEffect } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation } from 'react-router-dom';
function EditorPage() {

    const socketRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            // for sending the room id
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });
        };
        init();
    }, [])

    const [clients, setClients] = useState([
        { socketId: 1, username: "arvind" },
        { socketId: 2, username: "prakash" },
        { socketId: 3, username: "deepak" },
    ]);

    return (
        <div className='mainWrap'>
            <div className='aside'>
                <div className='asideInner'>
                    <div className='logo'>
                        <img
                            className='logoImage'
                            src='/code-sync.png'
                            alt='logo'></img>
                    </div>
                    <h3>Connected</h3>
                    <div className='clientsList'>
                        {
                            clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    username={client.username}
                                />
                            ))
                        }
                    </div>
                </div>
                <button className='btn copyBtn'>Copy ROOM ID</button>
                <button className='btn leaveBtn'>Leave</button>
            </div>
            <div className='editorWrap'>
                <Editor />
            </div>
        </div>
    )
}

export default EditorPage
