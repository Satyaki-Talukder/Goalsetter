import axios from 'axios';
import React, {memo, useCallback, useEffect, useState} from 'react'
import GoalForm from '../components/GoalForm'
import GoalItemContainer from '../components/GoalItemContainer'
import { useAuth } from '../utils/auth';

const Dashboard = () => {

  const [myGoals, setMyGoals] = useState(null);

  const {toastRef} = useAuth();


  const getGoals = useCallback(async() => {
      let url = 'https://goal-setter-st.herokuapp.com/api/goals'
      let accesstoken = JSON.parse(localStorage.getItem('userData')).usertoken
      const authAxios = axios.create({
          baseURL: url,
          headers: {
              Authorization: `Bearer ${accesstoken}`
          }
      });
      await authAxios.get(url)
        .then(res => setMyGoals(res.data.length !== 0 ? res.data : null))
        .catch(err => {
            toastRef.current.show('error', err.message);
        });
  }, [toastRef]);

  useEffect(() => {getGoals()}, [getGoals]);


  return (
    <section className="hero">
        {/* Flex Container */}
        <div className="container flex flex-col md:flex-row p-6 mx-auto mt-10 md:space-y-0 md:space-x-14">
            {/* Left Item: Goal Form */}
            <GoalForm getGoals={getGoals}/>
            {/* Right Item: Goal List */}
            <GoalItemContainer myGoals={myGoals} getGoals={getGoals} setMyGoals={setMyGoals}/>
        </div>
    </section>
  )
}

export default memo(Dashboard)