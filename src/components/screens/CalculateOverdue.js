import React, {useEffect, useState} from 'react'

const CalculateOverdue = ({overdueFine}) => {
    const [overdue, setOverdue] = useState(0);
    
    useEffect(() =>{
        calculateOverdue({overdueFine});
    },[])

    const calculateOverdue = (overdue) =>{
        overdue += 0.25;
        setOverdue(overdue);
    }

    return (
        <div>
            <p>{overdue}</p>
        </div>
    )
}

export default CalculateOverdue
