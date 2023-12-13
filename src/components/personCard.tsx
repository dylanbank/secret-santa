import { useState, useEffect } from "react";
import { Person } from "../pages/New";
interface Props {
    persons: Person[];
    index: number;
    remote: boolean;
    setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
    add(): any; 
}
export default function PersonCard({persons, index, remote, setPersons, add}:Props){
    const [ name, setName ] = useState('');
    const [ address, setAddress ] =useState('');
    const [visible, setVisible] = useState(true);
    useEffect(()=>{
        const newPersons : Person[] = persons.map((person:Person, mapIndex:number)=>{
            if(mapIndex != index){
                return person;
            }else{
                return {
                    name: name,
                    address: address
                };
            }
        });
        setPersons(newPersons)

    }, [name, address]);

    useEffect(()=>{
        setAddress('')
    }, [remote]);

    const Delete = () => {
        let newPersons = [...persons];
        newPersons.splice(index,1);
        setPersons(newPersons);
        setVisible(false);
    }

    return(
        <>
        { visible &&
            <div className={`flex justify-between items-center py-2 px-5 border-t border-t-pink `}  >
                <div className="flex flex-col items-start w-full">
                    <input className="w-full focus:outline-none" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} onKeyDown={(e)=>{ if(e.key==="Enter") {add()}}}></input>
                    { remote && 
                        <input className="focus:outline-none" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
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