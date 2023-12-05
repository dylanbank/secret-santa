import { useState } from "react";
import PersonCard from "../components/personCard";
export default function New(){
    const [ persons, setPersons ] = useState([{ 
        name: '',
        remote: false,
        address: ''
      }])
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
        let obj = {}
        persons.map((person,index) => {
            if(person.name) {
                final.push(person);
            }
        });
        let clone = Array.from(Array(final.length).keys());
        if(final.length>1){
            for(let i = 0; i<final.length; i++){
                let index;
                do{
                    index = clone[Math.floor(Math.random() * clone.length)]
                }while(index===i);

                obj[final[i].name] = final[index];
                
                clone.splice(index,1);
            }
            console.log(obj);
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
            {
                /*persons.map((person, index) => 
                    <div>
                        {person.name}
                        {person.remote}
                        {person.address}
                        {window.location.href}
                    </div>
            )*/}
            <a onClick={Submit}>generate</a>

        </div>
      );
}