import FreindList from './friendlist/friendlist';
import MiddleChat from './middlechat/middlechat';
import Members from './members/members';
import React from 'react';


class Container extends React.Component {
    render() {
        return (
            <div className="container mx-auto h-screen">
                <div className="min-w-full border-x rounded lg:grid lg:grid-cols-4 border-y-0">
                    <FreindList />
                    <MiddleChat />
                    <Members />
                </div>
            </div>
        )
    }
}

export default Container;
