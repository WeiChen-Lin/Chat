import React from 'react';
import Unopen from './unopen';
import Chatroom from './chatroom'

class MiddleChat extends React.Component {
    render() {
        return (
            <div className="lg:col-span-2 lg:block h-screen">
                {/* <Chatroom /> */}
                <Unopen />
            </div>
        )
    }
}

export default MiddleChat;