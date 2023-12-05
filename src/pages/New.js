import { useState } from "react";
import PersonCard from "../components/personCard";
export default function New(){
    const [ persons, setPersons ] = useState([{ 
        name: '',
        remote: false,
        address: ''
    }])
    const [ santas, setSantas ] = useState();
    const AddPerson = () => {
    setPersons(prevState => [
        ...prevState,
        {
        name: '',
        remote: false,
        address: '',
        }
    ])
    }
    const Submit = () => {
        let final = []
        //let copy = []

        persons.map((person,index) => {
            if(person.name) {
                final.push(person);
            }
        });
        
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZ')
        if(final.length>1){
            const random = (()=>{
                for (let i = final.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [final[i], final[j]] = [final[j], final[i]];
                }
                return final;
            })();
            console.log(random)
            const matches = random.map((person, index) => {
                const nextIndex = (index + 1) % random.length;
                return{
                    santa: person.name,
                    gifted: random[nextIndex].name,
                    address: random[nextIndex].address,
                }
            })
            setSantas(matches)
        }else{
            alert('add at least 2 people to the list')
        }
    }
      return (
        <div className='px-8 py-32 flex flex-col items-center'>
            <h1>Secret Santa Generator</h1>
            
            <div className='w-1/2'>
                <div className='flex justify-between bg-red p-5 rounded-t-lg'>
                    <p> Person </p>
                    <p> Remote? </p>
                </div>
                <div className='rounded-b-lg border-2 border-red'>
                    {
                    persons.map((person, index) => 
                        <PersonCard persons={persons} setPersons={setPersons} index={index}/>
                    )}
                </div>
            </div>
            <a className='-mt-2 bg-white cursor-pointer h-4 w-6 flex justify-center items-center' onClick={AddPerson}>
                <div className='h-full w-full bg-plus-icon bg-center bg-no-repeat' />
            </a>
            <a onClick={Submit}>generate</a>

            {
                santas &&
                santas.map((santa, index) => 
                    <div>
                        <p>{`${window.location.href}?santa=${santa.santa}&gifted=${window.btoa(santa.gifted)}&address=${window.btoa(santa.address)}`}</p>
                    </div>
                )
            }
        </div>
      );
}