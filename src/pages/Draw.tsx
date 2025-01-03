interface Props {
    budget: string,
    santa: string,
    gifted: string,
    address: string;
    ideas: string;
}
export default function Draw({budget, santa, gifted, address, ideas}:Props){
    return(
        <div className="h-screen w-screen flex justify-center items-center px-10 bg-red">
            <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-between">
                <div id="drawCardInvertCorner" className="p-1 ">
                    <div id="drawCardInvertCorner2" className="p-2">
                        <div id="drawCardInvertCorner" className="p-1 ">
                            <div id="drawCardInvertCorner2" className="p-16">
                                <div className="flex justify-between items-center">
                                    <div className="h-10 w-10 bg-santa bg-cover bg-no-repeat"></div>
                                </div>
                                <h3 className="text-left mb-10 pt-4 border-gold border-t">dear {santa},</h3>
                                <h3 className="text-left">you got <u>{window.atob(gifted)}</u> for secret santa! here are some things you should know about it:</h3>
                                <ul className="list-disc pl-16">
                                    { budget &&
                                        <li>
                                            <h3 className="text-left">the budget is <u>${budget}</u></h3>
                                        </li>
                                    }
                                    { address &&
                                        <li>
                                            <h3 className="text-left">if <u>{window.atob(gifted)}</u> will not be local at the gift opening, mail their gifts to </h3>
                                            <h3 className="text-left"> <u>{window.atob(address)}</u></h3>
                                        </li>
                                    }
                                    { ideas ?
                                        <li>
                                            <h3 className="text-left"><u>{window.atob(gifted)}</u> wished for</h3>
                                            <h3 className="text-left"><u>{window.atob(ideas)}</u></h3>
                                        </li> 
                                        :
                                        <li>
                                            <h3 className="text-left">your secret santa did not provide their wish list, so do your best to find some gifts for them!</h3>
                                        </li>
                                    }
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}