import React from 'react';
import Chatinfo from './chatroom/chatinfo';
import Mymsg from './chatroom/mymsg';
import Osmsg from './chatroom/osmsg';
import DownButs from './chatroom/downbuts'

class Chatroom extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            chatinfo: {
                name: 'Emma',
                isOnline: false
            },
            msgs: [
                {   
                    order: 1,
                    osmsg: 'hi',
                    time: '18:04'
                },
                {   
                    order: 2,
                    mymsg: 'hello',
                    time: '18:04'
                },
                {   
                    order: 3,
                    osmsg: 'hi',
                    time: '18:04'
                },
                {   
                    order: 4,
                    mymsg: 'hello',
                    time: '18:04'
                },
                {   
                    order: 5,
                    osmsg: 'hi',
                    time: '18:04'
                },
                {   
                    order: 6,
                    mymsg: 'hello',
                    time: '18:04'
                },{   
                    order: 7,
                    osmsg: 'hi',
                    time: '18:04'
                },
                {   
                    order: 8,
                    mymsg: 'hello',
                    time: '18:04'
                }
            ]
        }
    }

    render() {
        
        const msgs = this.state.msgs.map((msg) => {

            if(msg.osmsg){
                return <Osmsg
                    key={msg.order} 
                    msg={msg.osmsg}
                    time={msg.time}
                />
            } else {
                return <Mymsg 
                    key={msg.order} 
                    msg={msg.mymsg}
                    time={msg.time}
                />
            }
        })
        
        return (
            <div class="w-full flex flex-col h-full justify-between border-x">
                <Chatinfo 
                    name={this.state.chatinfo.name}
                    isOnline={this.state.chatinfo.isOnline}
                />
                <div class="relative w-full p-6 overflow-y-auto h-full">
                <ul class="space-y-2">
                    {msgs}
                </ul>
                </div>
                <DownButs />
            </div>
        )
    }
}

export default Chatroom;