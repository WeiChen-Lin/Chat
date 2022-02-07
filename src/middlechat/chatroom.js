import React from 'react';
import Chatinfo from './chatroom/chatinfo';
import Mymsg from './chatroom/mymsg';
import Osmsg from './chatroom/osmsg';
import DownButs from './chatroom/downbuts'

class Chatroom extends React.Component {
    render() {
        return (
            <div class="w-full flex flex-col h-full justify-between border-x">
                <Chatinfo />
                <div class="relative w-full p-6 overflow-y-auto h-full">
                <ul class="space-y-2">
                    <Osmsg />
                    <Mymsg />
                    <Mymsg />
                    <Osmsg />
                    <Osmsg />
                    <Mymsg />
                    <Mymsg />
                    <Osmsg />
                    <Osmsg />
                    <Mymsg />
                    <Mymsg />
                    <Osmsg />
                    <Osmsg />
                    <Mymsg />
                    <Mymsg />
                    <Osmsg />
                    <Osmsg />
                    <Mymsg />
                    <Mymsg />
                    <Osmsg />
                </ul>
                </div>
                <DownButs />
            </div>
        )
    }
}

export default Chatroom;