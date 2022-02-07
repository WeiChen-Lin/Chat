import React from 'react';
import Friend from './friend';
import SearchInput from './upperinput';

const friend_list = [
    {
        image: 'https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg',
        name: 'Jhon Don',
        last_min: '25 minutes',
        last_msg: 'bye',
        userID: 'user1'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png',
        name: 'Sam',
        last_min: '50 minutes',
        last_msg: 'Good night',
        userID: 'user2'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg',
        name: 'Emma',
        last_min: '6 hour',
        last_msg: 'Good Morning',
        userID: 'user3'
    }
]


class Friendlist extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            friend_list:  friend_list
        }
    }

    render() {

        const friends = this.state.friend_list.map( (value, index) => {
            return <Friend 
            key={value.userID} 
            name={value.name} 
            image={value.image}
            last_min={value.last_min}
            last_msg={value.last_msg}
            />
        })

        return (
            <div className="border-r border-gray-300 lg:col-span-1">
                <SearchInput />
                <ul className="overflow-auto h-[32rem]">
                    <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                    {friends}
                </ul>    
            </div>
        )
    }
}

export default Friendlist;