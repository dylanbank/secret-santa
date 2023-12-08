interface Props {
    santa: string,
    gifted: string,
    address: string;
}
export default function Draw({santa, gifted, address}:Props){
    return(
        <div className="h-screen w-screen flex justify-center items-center px-10 bg-red">
            <div className="w-full md:w-1/2 md:h-1/2 p-10 bg-white flex flex-col justify-between">
                <div>
                    <h2 >Hey {santa}, you got</h2>
                    <h1 >{window.atob(gifted)}</h1>
                    <h2 >for secret santa.</h2>
                </div>
                { address &&
                <div>
                    <h2>if {window.atob(gifted)} will not be local at the gift opening, mail their gifts to {window.atob(address)}</h2>
                </div>
                }
            </div>
        </div>
    );
}