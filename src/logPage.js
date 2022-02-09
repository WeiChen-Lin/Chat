import React from 'react';
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import Checkbox from "@material-tailwind/react/Checkbox"

class IndexPage extends React.Component {
    render() {
        return (
            <div className="w-full h-screen bg-gray-200">12
                <div className="absolute h-2/3 w-1/3 top-0 right-0 left-0 bottom-0 m-auto bg-white rounded-2xl">
                    <Input
                        type="text"
                        color="lightBlue"
                        size="sm"
                        outline={true}
                        placeholder="Enter your nickname"
                    />
                    <Checkbox
                        color="lightBlue"
                        text="別記住我"
                        id="checkbox"
                    />
                    <Button
                        color="lightBlue"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                    >
                        Enter
                    </Button>
                </div>
            </div>
        )
    }
}

export default IndexPage;
