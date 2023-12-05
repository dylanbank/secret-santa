import { useState, useEffect } from "react";

export default function PersonCard(props){
    const [ name, setName ] = useState('');
    const [ remote, setRemote ] = useState(false);
    const [ address, setAddress ] =useState('');
    useEffect(()=>{
        const newPersons = props.persons.map((person, index)=>{
            console.log(person)
            console.log(index)
            if(index != props.index){
                return person;
            }else{
                return {
                    name: name,
                    remote: remote,
                    address: address
                };
            }
        });
        props.setPersons(newPersons)

    }, [name, remote, address]);

    return(
        <div className={`flex justify-between py-2 px-5 border-t border-t-red`}  >
            <div className="flex flex-col items-start w-full">
                <input className="w-full focus:outline-none" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                { remote && 
                    <input className="ml-6 focus:outline-none" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                }
            </div>
            <input type="checkbox" onChange={()=>{setRemote(!remote)}}/>
            
        </div>
    );
}