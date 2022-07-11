import { useEffect, useState } from 'react';
import requestOptions from './Config';
const useGetExchangerates = (fromCurr) =>{
    const [userData, setUserData] = useState();
    const getUserData = async () => {
        await fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurr}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            setUserData(result);
        })
        .catch(error => console.log('error', error));
    }
    useEffect(()=>{
        getUserData();
    },[])

    return userData;
}
export default useGetExchangerates;