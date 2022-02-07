import React from 'react';

class Unopen extends React.Component {
    render() {
        return (
            <div className="flex flex-col w-full h-full justify-center border-x">
                <div class="mx-auto w-16 h-16 opacity-40">
                    <img src="../src/img/chat.svg" alt="startchat!" class="w-full h-full"/>
                </div>
                <h1 class="text-center text-4xl text-gray-500">Let's start chat</h1>
            </div>
        )
    }
}

export default Unopen