import React, { useState, useEffect } from 'react'
import './App.css'
import Content from "./Content"

function App() {

  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const toggleDisplay = () => {
    if (isDisplayOpen === true) {
      setIsDisplayOpen(false);
    }
    else {
      setIsDisplayOpen(true);
    }
  }

  const handleGroupingChange = (event) => {
    const selectedOption = event.target.value;
    setGrouping(selectedOption);
    localStorage.setItem('grouping', selectedOption);
  }

  const handleOrderingChange = (event) => {
    const selectedOption = event.target.value;
    setOrdering(selectedOption);
    localStorage.setItem('ordering', selectedOption);
  }

  useEffect(() => {
    console.log(localStorage)
    const savedGrouping = localStorage.getItem('grouping');
    const savedOrdering = localStorage.getItem('ordering');
    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
    if (savedOrdering) {
      setOrdering(savedOrdering)
    }
  }, []);

  return (
    <div className="App">
      <nav className='Navbar'>
        <button className='display-btn' onClick={toggleDisplay}>Display</button>
        {isDisplayOpen &&
          <div className='display-cnt'>
            <div className='grouping-dropdown dropdown' onChange={handleGroupingChange}>
              <label for="Grouping">Grouping </label>
              <select id="Grouping" value={grouping}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className='ordering-dropdown dropdown' onChange={handleOrderingChange}>
              <label for="Ordering">Ordering </label>
              <select id="Ordering" value={ordering}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>

          </div>
        }
      </nav>
      <Content group={grouping} order={ordering} />
    </div>
  );
}

export default App;
