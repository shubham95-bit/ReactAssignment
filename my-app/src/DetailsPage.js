import PageHeader from './PageHeader';
import PageBody from './PageBody';
import HistoryCharts from './HistoryCharts';
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

const DetailsPage = () => {
    const location = useLocation();
    const [fromCurr, setFromCurr] = useState(location.state.fromCurr);
    const [toCurr, setToCurr] = useState(location.state.toCurr);
    const [currencyList, setCurrencyList] = useState(location.state.currencyList)
    const [fromAmount, setFromAmount] = useState(location.state.fromAmount);
    const [toAmount, setToAmount] = useState(location.state.toAmount);
    const [exchangeRate, setExchangeRate] = useState(location.state.exchangeRate);
    const [selectedToCurr, setSelectedToCurr] = useState(location.state.selectedToCurr);
    const [disableButtons, setDisableButtons] = useState(location.state.disableButtons)
    const {
        currSymbol,
        isHomePage
    } = location.state;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "33ou3vwnWqO9IHB14NK8GT99mD3kKWDW");

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
            <h1 style={{paddingLeft:'1vh'}}>{fromCurr} - {currSymbol}</h1>
            <PageBody
                currencyList={currencyList}
                fromCurr={fromCurr}
                toCurr={location.state.toCurr}
                ChangeFromCurrency={(e) => {setFromCurr(e.target.value)}}
                ChangeToCurrency={(e) => {setToCurr(e.target.value)}}
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
            <HistoryCharts fromCurr={fromCurr} toCurr={toCurr} exchangeRateArray={location.state.exchangeRateArray}/>
        </div>
    )
}

export default DetailsPage;