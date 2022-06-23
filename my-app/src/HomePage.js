import PageHeader from './PageHeader';
import PageBody from './PageBody';
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();
    const [currencyList, setCurrencyList] = useState([])
    const [fromCurr, setFromCurr] = useState('EUR');
    const [toCurr, setToCurr] = useState('USD');
    const [fromAmount, setFromAmount] = useState(1);
    const [toAmount, setToAmount] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [selectedToCurr, setSelectedToCurr] = useState('USD');
    const [symbolList, setSymbolList] = useState();
    const [currSymbol, setCurrSymbol] = useState();
    const [disableButtons, setDisableButtons] = useState(location.state.disableButtons);
    const [isHomePage, setIsHomePage] = useState(location.state.isHomePage); 
    const [numberArray, setNumberArray] = useState([]);
    const [currArray, setCurrArray] = useState([]);
    const [exchangeRateArray, setExchangeRateArray]= useState([]);

    var myHeaders = new Headers();
    myHeaders.append("apikey", "33ou3vwnWqO9IHB14NK8GT99mD3kKWDW");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
    useEffect(()=>{
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=EUR`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            // console.log('result.rates',result.rates);
            // console.log('exchangeRateList',exchangeRateList);
            setCurrencyList([...Object.keys(result.rates)]);
            let tempExchRate = result.rates[toCurr];
            setExchangeRate(result.rates[toCurr]);
            let calculatedAmount = fromAmount * tempExchRate;
            setToAmount(calculatedAmount);

        })
        .catch(error => console.log('error', error));

        //Fetching the symbols of Currencies
        fetch(`https://api.apilayer.com/exchangerates_data/symbols`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            // console.log('symbol List',result);
            setSymbolList({...result.symbols});
            // console.log('symbolList',symbolList);
            let currSymbol = result.symbols[fromCurr];
            setCurrSymbol(currSymbol);
            // console.log('CurrSynmbol',currSymbol);
        })
        .catch(error => console.log('error',error));

    },[])

    //To Update the currency symbol whenever the fromCurr is Changing so that correct symbol can be updated for the details page
    useEffect(()=>{ 
        if(symbolList){
            let currSymbol = symbolList[fromCurr];
            setCurrSymbol(currSymbol);
        }
    },[fromCurr])

    const handleCurrencyConvert = () =>{
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurr}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log('result after convert button',result);
            let tempExchangeRate = result.rates[toCurr];
            setExchangeRate(tempExchangeRate);
            let calculatedAmount = fromAmount * tempExchangeRate;
            setToAmount(calculatedAmount);
            setSelectedToCurr(toCurr);

        //Code to calculate the conversion of entered amount to popular currencies
        let tempNumberArray = [];
        let tempCurrArray = [];
        let exchangeRates = [...Object.values(result.rates)];
        let tempExchangeRateArray = [];
        for(let i = 0; i < 9; i++){
            let random = Math.random() * 100;
            random = Math.floor(random);
            tempNumberArray.push(random);
            tempCurrArray.push(currencyList[random]);
            tempExchangeRateArray.push(exchangeRates[random]);
        }
        
        setNumberArray([...tempNumberArray]);
        setCurrArray([...tempCurrArray]);
        setExchangeRateArray([...tempExchangeRateArray])
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

            <PageHeader 
                fromCurr={fromCurr} 
                toCurr={toCurr} 
                currSymbol={currSymbol} 
                currencyList={currencyList}
                toAmount={toAmount}
                exchangeRate={exchangeRate}
            />

            <h1 style={{paddingLeft:'1vh'}}>Currency Exchanger</h1>

            <PageBody
                currencyList={currencyList}
                fromCurr={fromCurr}
                toCurr={toCurr}
                setFromCurrency={(e) => {setFromCurr(e.target.value)}}
                setToCurrency={(e) => {setToCurr(e.target.value)}}
                fromAmount={fromAmount}
                ChangeFromAmount={(e)=> {setFromAmount(e.target.value)}}
                toAmount={toAmount}
                handleCurrencyConvert={handleCurrencyConvert}
                handleSwapCurrencies={handleSwapCurrencies}
                selectedToCurr={selectedToCurr}
                currSymbol={currSymbol}
                exchangeRate={exchangeRate}
                disableButtons={disableButtons}
                isHomePage={isHomePage}
            />

            <div className="HomePage-PopularCurr">
                { 
                        numberArray.map((number,index)=>{
                            return(
                                <div className='Curr-Cards'>
                                    <div>{fromAmount * exchangeRateArray[index]} {currArray[index]}</div>
                                </div>
                            )
                        }) 
                }
            </div>
        </div>
    )
}

export default HomePage;