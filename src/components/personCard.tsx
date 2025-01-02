import { useState, useEffect } from "react";
import { Person } from "../pages/New";
interface Props {
    persons: Person[];
    index: number;
    remote: boolean;
    giftIdeas: boolean;
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
    add(): any;
    id: number;
}
export default function PersonCard({persons, index, remote, giftIdeas, setPersons, add, id}:Props){
    const [ name, setName ] = useState('');
    const [ address, setAddress ] =useState('');
    const [ giftIdea, setGiftIdea ] =useState('');
    const [visible, setVisible] = useState(true);
    useEffect(()=>{
        const newPersons : Person[] = persons.map((person:Person, mapIndex:number)=>{
            if(mapIndex != persons.findIndex(person=> person.id==id )){
                return person;
            }else{
                return {
                    name: name,
                    address: address,
                    giftIdea: giftIdea,
                    id: id
                };
            }
        });
        setPersons(newPersons)

    }, [name, address, giftIdea]);

    useEffect(()=>{
        setAddress('')
    }, [remote]);

    useEffect(()=>{
        setGiftIdea('')
    }, [giftIdeas]);

    const Delete = () => {
        let newPersons = [...persons];
        let delIndex = newPersons.findIndex(person=> person.id==id );
        console.log('delIndex: '+delIndex)
        newPersons.splice(delIndex,1);
        setPersons(newPersons);
        setVisible(false);
    }

    return(
        <>
        { visible &&
            <div className={`flex justify-between items-center py-4 px-5 border-t border-t-pink `}  >
                <div className="flex flex-col items-start w-full">
                    <h3><input className="w-full focus:outline-none" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} onKeyDown={(e)=>{ if(e.key==="Enter") {add()}}}></input></h3>
                    { remote && 
                        <h3><input className="focus:outline-none" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} /> </h3>
                    }
                    { giftIdeas &&
                        <h3><input className="focus:outline-none" placeholder="gift ideas" value={giftIdea} onChange={(e)=>{setGiftIdea(e.target.value)}} /> </h3>
                    }
                </div>
                { index != 0 &&
                    <a className='bg-white cursor-pointer h-4 w-6 flex justify-center items-center' onClick={Delete}>
                        <div className='h-full w-full bg-trash-icon bg-center bg-no-repeat' />
                    </a>
                }
            </div>
        }
        </>
    );
}