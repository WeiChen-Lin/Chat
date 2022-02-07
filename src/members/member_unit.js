import React from 'react';

class MemberUnit extends React.Component {
    render() {
        return (
            <li>
                <a class="flex flex-col px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                    <div class="flex items-center">
                        <img class="object-cover w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
                        <div class="block ml-2 text-base font-semibold text-gray-600">
                        Jhon Don
                        </div>
                    </div>
                    <div class="ml-10 px-2 w-4/5 break-words">hellohellohellohellohellohellohellohellohell<br/>
                        ohellohellohellohellohellohellohellohellohello
                    </div>
                </a>            
            </li>
        )
    }
}

export default MemberUnit;