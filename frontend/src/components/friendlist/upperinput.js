import React from 'react';
import Input from '@material-tailwind/react/Input';

export default function SearchInput() {
  return (
    <div className="mx-3 my-3">
      <div className="relative text-gray-600">
        <Input
          type="text"
          color="deepOrange"
          size="sm"
          outline={true}
          placeholder="Search friend"
        />
      </div>
    </div>
  );
}
