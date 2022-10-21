import React from 'react';

interface props{
    name: string;
    time: number
}
export default function Greetings({ name, time }: props) {
    

  return (
    <div>
          <h2>Hello </h2>
          <p>
          {
             time >= 12 ? 
                 'Good afternoon ' + name : 'Good Morning'+ name
             
          }
          </p>
    </div>
  );
}
