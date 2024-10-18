import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import useThemeSwitcher from '../hooks/useThemeSwitcher'
import { toast } from "react-toastify";
import { ring2 } from "ldrs";
import { UserServices } from '../services/UserServices';
import InfiniteScrollComponent from '../components/reusables/InfiniteScrollComponent';
import LoadingComponent from '../components/reusables/LoadingComponent';

function MyLearning() {
  const [isLoading, setIsLoading] = useState(false)
  const {userData} = useContext(AuthContext)
  ring2.register();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const userServices = new UserServices()
      try {
        // const response = userServices.getUserModule(token, userId)
        // const quizResponse = userServices.getUserQuizHistory(token, userId)
        // setData(prevState => [...prevState, ...response])
        // setQuizData(prevState => [...prevState, ...quizResponse])
      } catch (error) {
        toast.error(
          "Error when fetching data. Kindly reload page."
      );
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  })

  return (
    <main className='text-primary-dark dark:text-primary-light px-5 lg:px-8 pb-8'>
        <div>
            <h1 className='text-2xl mb-10'>Active Modules</h1>
            <div className={`relative ${isLoading ? "min-h-screen" : "" }`}>
                {!isLoading && <div>
                    {userData.learningProfile.length > 0 ? (
                        <InfiniteScrollComponent data={userData.learningProfile} />
                    ) : (
                        <p className="text-primary-dark dark:text-primary-light">
                            No learning Modules available
                        </p>
                    )}
                </div>}
                {isLoading && (
                    <LoadingComponent/>
                )}
            </div>
        </div>
    </main>
  )
}

export default MyLearning