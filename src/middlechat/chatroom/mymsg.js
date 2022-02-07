import React from 'react';

class Mymsg extends React.Component {
    render() {
        return (
            <li className="items-end flex flex-row-reverse justify-start">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block">Hiiii</span>
                </div>
                <div className="max-h-5 text-sm mx-2 text-gray-600">18:04</div>
            </li>
        )
    }
}

export default Mymsg