import { useState } from "react";

export default function Draw(props){
    return(
        <div className="h-screen w-screen flex justify-center items-center px-10 bg-red">
            <div className="w-full md:w-1/2 md:h-1/2 p-10 bg-white">
                <div>
                    <h2 >Hey {props.santa}, you got</h2>
                    <h2 >{window.atob(props.gifted)}</h2>
                    <h2 >for secret santa.</h2>
                </div>
                { props.address &&
                <div>
                    <h2>{window.atob(props.gifted)} will not be local so their address for mailing gifts to will be {window.atob(props.address)}</h2>
                </div>
                }
            </div>
        </div>
    );
}