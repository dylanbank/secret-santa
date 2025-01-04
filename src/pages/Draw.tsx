import santaSig from "../assets/santaClausSig.png";

interface Props {
    budget: string,
    santa: string,
    gifted: string,
    address: string;
    ideas: string;
}
export default function Draw({budget, santa, gifted, address, ideas}:Props){
    return(
        <div className="h-screen w-screen  justify-center items-center md:py-8 lg:py-16  md:px-10 xl:px-64 bg-red overflow-y-auto">
            <div className="w-full  p-8 bg-white flex flex-col justify-between">
                <div id="drawCardInvertCorner" className="p-1 ">
                    <div id="drawCardInvertCorner2" className="p-2">
                        <div id="drawCardInvertCorner" className="p-1 ">
                            <div id="drawCardInvertCorner2" className="p-8 md:p-16">
                                <div className="flex justify-between items-center">
                                    <div className="h-10 w-10 bg-santa bg-cover bg-no-repeat"></div>
                                </div>
                                <h3 className="text-left pt-6 border-gold border-t">dear {santa},<br/><br/></h3>
                                <h3 className="text-left">you got <u>{window.atob(gifted)}</u> for secret santa! here are some things you should know about it:</h3>
                                <ul className="list-disc pl-8 md:pl-16">
                                    { budget &&
                                        <li>
                                            <h3 className="text-left">the budget is <u>${budget}</u></h3>
                                        </li>
                                    }
                                    { address &&
                                        <li>
                                            <h3 className="text-left">if {window.atob(gifted)} will not be physically present at the gift opening, mail their gifts to <u>{window.atob(address)}</u></h3>
                                        </li>
                                    }
                                    { ideas ?
                                        <li>
                                            <h3 className="text-left">{window.atob(gifted)} wished for <u>{window.atob(ideas)}</u></h3>
                                        </li> 
                                        :
                                        <li>
                                            <h3 className="text-left">your secret santa did not provide their wish list, so do your best to find some gifts for them!</h3>
                                        </li>
                                    }
                                    
                                </ul>
                                <h3 className="text-left">make sure to get your gifts early so {window.atob(gifted)} doesn't get a last minute candle and everyone thinks differently of your thoughtfulness for others! </h3>
                                <h3 className="text-left"><br/>your friend,</h3>
                                <img src={santaSig} width="150" height="50"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}