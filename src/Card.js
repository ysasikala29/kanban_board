import React from 'react'
import "./Card.css"

export default function Card(props){

    const priorityArray = ["0: No Priority", "1: Low ", "2: Medium", "3: High", "4: Urgent"]

    return(
        <div>
            <div className='card-container'>
                <div className='flex-1'>
                    <div className='content-1-1'>
                        {props.item.id}
                    </div>
                    <div className='content-1-2'>{priorityArray[props.item.priority]}</div>
                </div>
                <p className='card-title'>{props.item.title}</p>
                {props.item.tag.map((tag, tagIndex) => (
                    <span className='card-tag'>{tag}</span>
                ))}
            </div>
        </div>
    )
}