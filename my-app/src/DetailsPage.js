import PageHeader from './PageHeader';
import PageBody from './PageBody';
import HistoryCharts from './HistoryCharts';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const DetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [fromCurr, setFromCurr] = useState(location.state.fromCurr);
    const [toCurr, setToCurr] = useState(location.state.toCurr);
    const [currencyList, setCurrencyList] = useState(location.state.currencyList)
    const [fromAmount, setFromAmount] = useState(location.state.fromAmount);
    const [toAmount, setToAmount] = useState(location.state.toAmount);
    const [exchangeRate, setExchangeRate] = useState(location.state.exchangeRate);
    const [selectedToCurr, setSelectedToCurr] = useState(location.state.selectedToCurr);
    const [disableButtons, setDisableButtons] = useState(location.state.disableButtons);
    const [exchangeRateArray, setExchangeRateArray] = useState(location.state.exchangeRateArray)
    const {
        currSymbol,
        isHomePage
    } = location.state;
    console.log('fromCurr',fromCurr);
    console.log('toCurr',toCurr);
    console.log('location.state.fromCurr',location.state.fromCurr);
    console.log('location.state.toCurr',location.state.toCurr);
    var myHeaders = new Headers();
    myHeaders.append("apikey", "29PVT27k8eUCw8rYlKPbbGcZCqutwCK3");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const handleCurrencyConvert = () =>{
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurr}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            let tempExchangeRate = result.rates[toCurr];
            setExchangeRate(tempExchangeRate);
            let calculatedAmount = fromAmount * tempExchangeRate;
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

    const handleMoreDetails = async (curr1, curr2, amount) => {

        let monthsArray = [];
        let exchangeRateArray = [];
        
        await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${'2021-01-31'}&end_date=${'2021-12-31'}&base=${curr1}&symbols=${curr2}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log('result',result);
            // Code to Determine Last Date of every month
            for(let i=0; i<12; i++){
                var d = new Date(2021, i + 1, 0);
                let date = d.toString()
                function convertDate(inputFormat) {
                    function pad(s) { return (s < 10) ? '0' + s : s; }
                    var d = new Date(inputFormat)
                    return [d.getFullYear(), pad(d.getMonth()+1),  pad(d.getDate())].join('-')
                }
                monthsArray.push(convertDate(date));
                let dateValue = monthsArray[i];
                // console.log('dateValue',dateValue);
                let exchangeObject = result.rates[dateValue];
                // let targetCurr = curr2;
                console.log('exchangeObject',exchangeObject);
                exchangeRateArray.push(exchangeObject[curr2]);
                // console.log(monthsArray);
                console.log('exchangeRateArray',exchangeRateArray)    
                navigate('/DetailsPage',{state:{fromCurr: curr1, toCurr: curr2, currSymbol: currSymbol, fromAmount: amount, currencyList: currencyList, selectedToCurr: selectedToCurr, disableButtons: false, isHomePage: false, exchangeRateArray: exchangeRateArray, toAmount:toAmount, exchangeRate:exchangeRate, displayCurr:curr1}});
            }
        })

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
                handleMoreDetails={handleMoreDetails}
            />

            <h1 style={{paddingLeft:'1vh'}}>{location.state.displayCurr} - {currSymbol}</h1>
            
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
            <HistoryCharts fromCurr={fromCurr} toCurr={toCurr} exchangeRateArray={exchangeRateArray}/>
        </div>
    )
}

export default DetailsPage;