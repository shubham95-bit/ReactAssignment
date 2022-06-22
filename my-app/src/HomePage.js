import PageHeader from './PageHeader';
import PageBody from './PageBody';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [currencyList, setCurrencyList] = useState([])
    const [fromCurr, setFromCurr] = useState('EUR');
    const [toCurr, setToCurr] = useState('USD');
    const [fromAmount, setFromAmount] = useState(1);
    const [toAmount, setToAmount] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [selectedToCurr, setSelectedToCurr] = useState('USD');

    var myHeaders = new Headers();
    myHeaders.append("apikey", "EbeiIUhqIbm151uFmEExAdmZ6xQggwxu");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
    useEffect(()=>{
        //Neeche wali line useEffect ko jab uncomment kare tab hata dena
        // setToAmount(fromAmount * exchangeRate);
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=EUR`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setExchangeRate(result.rates[toCurr]);
            let calculatedAmount = fromAmount * exchangeRate;
            setToAmount(calculatedAmount);
            setCurrencyList([...Object.keys(result.rates)]);
            console.log('Currency List',currencyList);
        })
        .catch(error => console.log('error', error));
    },[])

    const handleCurrencyConvert = () =>{
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurr}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            setExchangeRate(result.rates[toCurr]);
            let calculatedAmount = fromAmount * exchangeRate;
            setToAmount(calculatedAmount);
            setSelectedToCurr(toCurr);
        })
        .catch(error => console.log('error',error));
    }

    const handleSwapCurrencies = () => {
        let curr1 = fromCurr;
        let curr2 = toCurr;
        setFromCurr(curr2);
        setToCurr(curr1);
    }

    return (
        <div className="HomePage-Body">
            <PageHeader/>

            <h1 style={{paddingLeft:'1vh'}}>Currency Exchanger</h1>

            <PageBody
                currencyList={currencyList}
                fromCurr={fromCurr}
                toCurr={toCurr}
                ChangeFromCurrency={(e) => {setFromCurr(e.target.value)}}
                ChangeToCurrency={(e) => {setToCurr(e.target.value)}}
                fromAmount={fromAmount}
                ChangeFromAmount={(e)=> {setFromAmount(e.target.value)}}
                toAmount={toAmount}
                handleCurrencyConvert={handleCurrencyConvert}
                handleSwapCurrencies={handleSwapCurrencies}
                selectedToCurr={selectedToCurr}
            />

            <div className="HomePage-PopularCurr">

            </div>
        </div>
    )
}

export default HomePage;