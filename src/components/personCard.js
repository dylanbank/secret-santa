import { useState, useEffect } from "react";

export default function PersonCard(props){
    const [ name, setName ] = useState('');
    const [ ideas, setIdeas ] = useState('');
    const [ address, setAddress ] =useState('');
    const [visible, setVisible] = useState(true);
    useEffect(()=>{
        const newPersons = props.persons.map((person, index)=>{
            if(index != props.index){
                return person;
            }else{
                return {
                    name: name,
                    ideas: ideas,
                    address: address
                };
            }
        });
        props.setPersons(newPersons)

    }, [name, ideas, address]);

    useEffect(()=>{
        setAddress('')
    }, [props.remote]);

    const Delete = () => {
        let newPersons = [...props.persons];
        newPersons.splice(props.index,1);
        props.setPersons(newPersons);
        setVisible(false);
    }

    return(
        <>
        { visible &&
            <div className={`flex justify-between items-center py-2 px-5 border-t border-t-pink `}  >
                <div className="flex flex-col items-start w-full">
                    <input className="w-full focus:outline-none" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} onKeyDown={(e)=>{ if(e.key==="Enter") {props.add()}}}></input>
                    <input className="focus:outline-none" placeholder="gift ideas" value={ideas} onChange={(e)=>{setIdeas(e.target.value)}} />
                    { props.remote && 
                        <input className="focus:outline-none" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                    }
                </div>
                { props.index != 0 &&
                    <a className='bg-white cursor-pointer h-4 w-6 flex justify-center items-center' onClick={Delete}>
                        <div className='h-full w-full bg-trash-icon bg-center bg-no-repeat' />
                    </a>
                }
            </div>
        }
        </>
    );
}