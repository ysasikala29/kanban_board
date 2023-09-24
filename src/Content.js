import React, { useEffect, useState } from 'react';
import DisplayContent from "./DisplayContent";

export default function YourComponent(props) {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => res.json())
      .then((json) => {
        setTickets(json.tickets); 
        setUsers(json.users); 
        setFetchedData(true);
      });
  }, []);

  return(
    <div>
        {fetchedData === true && (
            <DisplayContent tickets={tickets} users={users} group={props.group} order={props.order} />
        )}
    </div>
  )
}
