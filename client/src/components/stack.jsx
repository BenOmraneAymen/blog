import * as React from "react"

export default function Stack(props){
    return(
        <div className="flex flex-col m-2">
        {
            props.children
        }
        </div>
    );
}