import React from 'react';

function Osmsg (props) {
    return (
        <li className="items-end flex justify-start">
            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                <span className="block"> {props.msg} </span>
            </div>
            <div className="max-h-5 text-sm mx-2 text-gray-600"> {props.time} </div>
        </li>
    )
}

export default Osmsg