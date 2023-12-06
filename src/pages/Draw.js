import { useState } from "react";

export default function Draw(props){
    return(
        <div className="h-screen w-screen flex justify-center items-center px-10 bg-red">
            <div className="w-full md:w-1/2 md:h-1/2 p-10 bg-white flex flex-col justify-between">
                <div>
                    <h2 >Hey {props.santa}, you got</h2>
                    <h1 >{window.atob(props.gifted)}</h1>
                    <h2 >for secret santa.</h2>
                </div>
                { props.address &&
                <div>
                    <h2>if {window.atob(props.gifted)} will not be local at the gift opening, mail their gifts to {window.atob(props.address)}</h2>
                </div>
                }
            </div>
        </div>
    );
}