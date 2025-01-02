interface Props {
    santa: string,
    gifted: string,
    address: string;
    ideas: string;
}
export default function Draw({santa, gifted, address, ideas}:Props){
    return(
        <div className="h-screen w-screen flex justify-center items-center px-10 bg-red">
            <div className="w-full md:w-1/2 md:h-1/2 p-10 bg-white flex flex-col justify-between">
                <div>
                    <h3 className="text-left mb-10">dear <u>{santa}</u>,</h3>
                    <h3 className="text-left">you got <u>{window.atob(gifted)}</u> for secret santa!</h3>
                    <h3 className="text-left">here are some things you should know about it:</h3>
                    <ul className="list-disc pl-16">
                        { address &&
                            <li>
                                <h3 className="text-left">if <u>{window.atob(gifted)}</u> will not be local at the gift opening, mail their gifts to </h3>
                                <h3 className="text-left"> <u>{window.atob(address)}</u></h3>
                            </li>
                        }
                        { ideas &&
                            <li>
                                <h3 className="text-left"><u>{window.atob(gifted)}</u> wished for</h3>
                                <h3 className="text-left"><u>{window.atob(ideas)}</u></h3>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}