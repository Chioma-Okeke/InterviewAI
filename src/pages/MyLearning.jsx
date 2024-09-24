import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import useThemeSwitcher from '../hooks/useThemeSwitcher'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ring2 } from "ldrs";
import { UserServices } from '../services/UserServices';
import InfiniteScrollComponent from '../components/reusables/InfiniteScrollComponent';

function MyLearning() {
  const [theme, setTheme] = useThemeSwitcher()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [quizData, setQuizData] = useState([])
  const {token, userId} = useContext(AuthContext)
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
                    {data.length > 0 ? (
                        <InfiniteScrollComponent data={data} />
                    ) : (
                        <p className="text-primary-dark dark:text-primary-light">
                            No learning Modules available
                        </p>
                    )}
                </div>}
                {isLoading && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <l-ring-2
                            size="40"
                            stroke="5"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8"
                            color={theme === "dark" ? "#ECECEC" : "#212121"}
                        ></l-ring-2>
                    </div>
                )}
            </div>
        </div>
            <ToastContainer />
    </main>
  )
}

export default MyLearning