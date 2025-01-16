import { useState } from "react";
import PersonCard from "../components/personCard";
import { isElementAccessExpression } from "typescript";

export interface Person{
    name: string;
    address: string;
    giftIdea: string;
    id: number;
}

export interface Persons{
    persons: Person[];
}

interface Santa{
    santa: string;
    gifted: string;
    address: string;
    ideas: string;
}
export default function New(){
    const [ remote, setRemote ] = useState<boolean>(false);
    const [ giftIdeas, setGiftIdeas ] =useState<boolean>(false);
    const [ budget, setBudget ] = useState<string>('');
    const [ errorMsg, setErrorMsg ] = useState<string>('');
    const [ persCount, setPersCount ] = useState<number>(1); // for ids
    const [ persons, setPersons ] = useState<Array<Person>>([{ 
        name: '',
        address: '',
        giftIdea: '',
        id: 0
    }])
    const [ santas, setSantas ] = useState<Array<Santa>>([]);

    const AddPerson = () => {
        setPersons(prevState => [
            ...prevState,
            {
                name: '',
                address: '',
                giftIdea: '',
                id: persCount
            }
        ])
        
        setPersCount(prevState => ( prevState+1));
    }
    const Submit = () => {
        let final : Person[] = [];
        let error: boolean = false;
        setErrorMsg('');
        setSantas([]);
        //adds the person to the gen list if they have a name and address (address required for online opening)

        //logic needs to be fixed for if participants are missing information
        console.log('persons');
        console.log(persons);

        for(let i = 0; i<persons.length; i++){
            if(remote) {
                if(persons[i].address==''||persons[i].name==''){
                    setErrorMsg('make sure all participants have their name and address entered');
                    error = true;
                    
                }else{
                    final.push(persons[i]);
                }
            }else{
                if(persons[i].name==''){
                    setErrorMsg('make sure all participants have their name entered');
                    error=true;
                    
                }else{
                    final.push(persons[i]);
                }
            }
        }
        console.log('final');
        console.log(final);
        if(final.length<=1){
            error = true;
            if(remote){
                setErrorMsg('add at least 2 people to the list with their name and address entered');
            }else{
                setErrorMsg('add at least 2 people to the list with their name entered');
            }
        }
        if(budget==''||budget=='0'){
            error=true;
            setErrorMsg('enter a budget in the options above');
        }
        if(!error){
            const random = (()=>{
                for (let i = final.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [final[i], final[j]] = [final[j], final[i]];
                }
                return final;
            })();
            const matches : Santa[] = random.map((person, index) => {
                const nextIndex = (index + 1) % random.length;
                return{
                    santa: person.name,
                    gifted: random[nextIndex].name,
                    address: random[nextIndex].address,
                    ideas: random[nextIndex].giftIdea
                }
            })
            const randomMatches : Santa[] = (()=>{
                for (let i = matches.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [matches[i], matches[j]] = [matches[j], matches[i]];
                }
                return matches;
            })();
            console.log(randomMatches);
            setSantas(randomMatches);
        }
    }
      return (
        <div className='xl:px-64 md:px-40 px-16 py-32 flex flex-col xl:flex-row gap-0 xl:gap-12'>
            <div className="xl:basis-1/3">
                <div className="xl:border-r-2 border-black">
                    <div className="flex items-center">
                        <div className="h-24 w-24 bg-santa bg-cover bg-no-repeat"></div>
                    </div>
                    <h1 className="text-left">Secret Santa <br/>Generator</h1>
                    <div className="py-5 pr-12">
                        <h3 className="text-left">Have you ever been asked what to get for somebody else's secret santa?</h3>
                        <h3 className="text-left">Don't you wish there was a quicker, more consistent way to run it?</h3>
                        <h3 className="text-left text-red"><a href='https://github.com/dylanbank/'><u>github</u></a></h3>
                    </div>
                </div>
            </div>
            <div className="xl:basis-2/3">
                <div className="shadow-2xl">
                    <div className="bg-green p-5 rounded-t-lg mt-5 lg:mt-0">
                        <h2 className="text-left text-white">options</h2>
                    </div>
                    <div className="py-4 px-5 rounded-b-lg border-2 border-green">
                        <div className="flex items-center justify-start gap-5 w-full pb-3">
                            <h3>budget: </h3>
                            <span className="flex gap-1">
                                <h3>$</h3>
                                <h3><input className="w-12" value={budget} placeholder="50" onChange={(e)=>{setBudget(e.target.value)}}></input></h3>
                            </span>
                            <div className="bg-pink border-red border rounded-lg px-2">
                                <p className="text-red text-sm ">required</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-5 border-t border-t-lime py-3 ">
                                <div className="has-tooltip group">
                                    <span className='tooltip rounded-lg shadow-lg p-1 -mt-20 lg:-mt-8  bg-gray border border-black text-left w-64 lg:w-fit'>if anybody participating in secret santa will not be local when the gifts are opened, check this box.</span>
                                    <h3 className="text-left font-semibold ">online opening:</h3>
                                </div>
                                {/*if anybody participating in secret santa will not be local when gift opening happens, check this box.*/}
                                
                            <input className='shadow-inner' type="checkbox" onChange={()=>{setRemote(!remote)}}/>
                            
                        </div>
                        <div className="flex items-center justify-start gap-5 w-full border-t border-t-lime pt-3">
                            <h3>gift ideas:</h3>
                            <input className='shadow-inner' type="checkbox" onChange={()=>{setGiftIdeas(!giftIdeas)}}/>
                        </div>
                    </div> 
                </div>   
                <div className='mt-10 shadow-2xl'>
                    <div className="bg-red p-5 rounded-t-lg">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-white">participants </h2>
                            <div className='h-10 w-10 bg-gift-icon bg-cover bg-no-repeat' />
                            
                        </div>
                        <a className='mt-2 bg-white cursor-pointer h-8 w-12 flex justify-center items-center rounded-lg' onClick={AddPerson}>
                            <div className='h-full w-full bg-plus-icon bg-center bg-no-repeat' />
                        </a>
                    </div>
                    <div className='rounded-b-lg border-2 border-red'>
                        {
                        persons.map((person, index) => 
                            <PersonCard persons={persons} setPersons={setPersons} index={index} add={AddPerson} remote={remote} giftIdeas={giftIdeas} id={person.id} key={person.id}/>
                        )}
                    </div>
                    
                </div>
                <a className="cursor-pointer mt-10 px-6 py-3 bg-green rounded text-white w-32" onClick={Submit}>generate</a>
                {errorMsg && 
                    <div className="flex flex-col gap-2 mt-6 text-left">
                        <h3 className="text-red">your list did not generate because you need to {errorMsg}.</h3>
                    </div>}
                {santas.length ?
                <div className="mt-10">
                    
                    <h2 className="text-left">Send To:</h2>
                    <h3 className="text-left">{'(click to copy to clipboard)'}</h3>
                    <div className="flex flex-col w-fit mt-5">
                        {
                        santas.map((santa) => 
                            <a title="Click to copy url" key={santa.santa} className="cursor-pointer text-left" onClick={() => {navigator.clipboard.writeText(`${window.location.href}?budget=${budget}&santa=${santa.santa.replace(" ","+")}&gifted=${window.btoa(santa.gifted)}&address=${window.btoa(santa.address)}&ideas=${window.btoa(santa.ideas)}`)}}>{santa.santa}</a>
                        )}
                    
                    </div>
                </div> : ''
            }
            </div>
        </div>
      );
}