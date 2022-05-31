import React from 'react'
import GoalItem from './GoalItem'

const GoalItemContainer = ({myGoals, getGoals, setMyGoals}) => {
  return (
    <div className='w-full space-y-2 overflow-hidden flex flex-col md:w-1/2'>
        {myGoals ? myGoals.map(goal => <GoalItem key={goal._id} goal={goal} getGoals={getGoals} myGoals={myGoals} setMyGoals={setMyGoals}/>) : 'No Goals present. Add one.'}
    </div>
  )
}

export default GoalItemContainer