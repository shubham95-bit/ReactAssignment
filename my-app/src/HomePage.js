import PageHeader from './PageHeader';
import PageBody from './PageBody';
import { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import requestOptions from './Helpers/Config';
import useGetExchangeRates from './Helpers/useGetExchangeRates';
import useGetCurrencySymbols from './Helpers/useGetCurrencySymbols';

let initialState = {
    currencyList: [],
    fromCurr: 'EUR',
    toCurr: 'USD',
    fromAmount: 1,
    toAmount: 1,
    exchangeRate: 1,
    selectedToCurr: 'USD',
    symbolList: {},
    currSymbol: '',
    randomNumberArray: [],
    popularCurrArray: [],
    popularExchangeRateArray: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setCurrencyList':
            return { ...state, currencyList: [...Object.keys(action.payload.rates)]}
        
        case 'setFromCurr':
            return { ...state, fromCurr: action.payload.curr}    
            
        case 'setToCurr':
            return { ...state, toCurr: action.payload.curr}
            
        case 'setFromAmount':
            return { ...state, fromAmount: action.payload.amount}
                
        case 'setToAmount':
            return { ...state, toAmount: action.payload.amount}
        
        case 'setExchangeRate':
            return { ...state, exchangeRate: action.payload.exchRate}
            
        case 'setSelectedToCurr':
            return { ...state, selectedToCurr: action.payload.curr}
        
        case 'setSymbolList':
            return { ...state, symbolList: {...action.payload.symbols}}
            
        case 'setCurrSymbol':
            return { ...state, currSymbol: action.payload.symbol}
        
        case 'setRandomNumberArray':
            return { ...state, randomNumberArray: [...action.payload.arr]}

        case 'setPopularCurrArray':
            return { ...state, popularCurrArray: [...action.payload.arr]}
        
        case 'setPopularExchangeRateArray':
            return { ...state, popularExchangeRateArray: [...action.payload.arr]}
    }
}
const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [disableButtons, setDisableButtons] = useState(location.state.disableButtons);
    const [isHomePage, setIsHomePage] = useState(location.state.isHomePage);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currencyList, 
            fromCurr, 
            toCurr, 
            fromAmount, 
            toAmount, 
            exchangeRate, 
            selectedToCurr, 
            symbolList, 
            currSymbol,
            randomNumberArray, 
            popularCurrArray, 
            popularExchangeRateArray
    } = state;
    let exchangeRatesResult = useGetExchangeRates(fromCurr);
    let currencySymbolsResult = useGetCurrencySymbols();

    const getExchangeRates = () => {
        console.log('getExchangeRates called');
        dispatch({ 
            type: 'setCurrencyList', 
            payload: { rates: exchangeRatesResult.rates } 
        })

        let tempExchRate = exchangeRatesResult.rates[toCurr];
        dispatch({ 
            type: 'setExchangeRate', 
            payload: { exchRate: tempExchRate} 
        })
                
        let calculatedAmount = fromAmount * tempExchRate;
        dispatch({ 
            type: 'setToAmount', 
            payload: { amount: calculatedAmount } 
        })
    }

    const getCurrencySymbols = () =>{
        console.log('getCurrencySymbols called');
        dispatch({ 
            type: 'setSymbolList', 
            payload: { symbols: currencySymbolsResult.symbols } 
        })
        let currSymbol = currencySymbolsResult.symbols[fromCurr];
        dispatch({ 
            type: 'setCurrSymbol', 
            payload: { symbol: currSymbol } 
        })
    }

    
    useEffect(()=>{
        console.log('UseEffect called');
        if(exchangeRatesResult && currencySymbolsResult){
            getExchangeRates();
            getCurrencySymbols();
        }
    },[exchangeRatesResult,currencySymbolsResult])

    //To Update the currency symbol whenever the fromCurr is Changing so that correct symbol can be updated for the details page
    useEffect(()=>{ 
        if(symbolList){
            let currSymbol = symbolList[fromCurr];
            dispatch({
                type:'setCurrSymbol', 
                payload:{ symbol: currSymbol}
            })
        }
    },[fromCurr])

    const handleCurrencyConvert = () =>{

        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurr}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            let tempExchangeRate = result.rates[toCurr];
            dispatch({ 
                type: 'setExchangeRate', 
                payload: { exchRate: tempExchangeRate} 
            })
            let calculatedAmount = fromAmount * tempExchangeRate;
            dispatch({
                type: 'setToAmount', 
                payload: {amount: calculatedAmount}
            })
            dispatch({
                type: 'setSelectedToCurr', 
                payload: { curr: toCurr }
            })
        
            //Code to calculate the conversion of entered amount to popular currencies
            let tempRandomNumberArray = [];
            let tempPopularCurrArray = [];
            let exchangeRates = [...Object.values(result.rates)];
            let tempPopularExchangeRateArray = [];
            for(let i = 0; i < 9; i++){
                let random = Math.random() * 165;
                random = Math.floor(random);
                tempRandomNumberArray.push(random);
                tempPopularCurrArray.push(currencyList[random]);
                tempPopularExchangeRateArray.push(exchangeRates[random]);
            }
            dispatch({
                type: 'setRandomNumberArray', 
                payload: { arr: [...tempRandomNumberArray] }
            })
            dispatch({
                type: 'setPopularCurrArray', 
                payload: { arr: [...tempPopularCurrArray] }
            })
            dispatch({
                type: 'setPopularExchangeRateArray', 
                payload: { arr: [...tempPopularExchangeRateArray] }
            })
        })
        .catch(error => console.log('error',error));
    }

    const handleSwapCurrencies = () => {
        let curr1 = fromCurr;
        let curr2 = toCurr;
        dispatch({
            type: 'setFromCurr', 
            payload: { curr: curr2 }
        })
        dispatch({
            type: 'setToCurr', 
            payload: { curr: curr1 }
        })
    }

    const handleMoreDetails = (curr1, curr2, amount) => {

        let monthsArray = [];
        let exchangeRateArray = [];
        
        fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${'2021-01-31'}&end_date=${'2021-12-31'}&base=${curr1}&symbols=${curr2}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
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
                let exchangeObject = result.rates[dateValue];
                exchangeRateArray.push(exchangeObject[curr2]);  
            }
            navigate('/DetailsPage',{state:{fromCurr: curr1, toCurr: curr2, currSymbol: currSymbol, fromAmount: amount, currencyList: currencyList,selectedToCurr: selectedToCurr,
            disableButtons: false, isHomePage: false, exchangeRateArray: exchangeRateArray,
            toAmount:toAmount, exchangeRate:exchangeRate, displayCurr:curr1
            }});
            
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

            <h1 style={{paddingLeft:'1vh'}}>Currency Exchanger</h1>

            <PageBody
                currencyList={currencyList}
                fromCurr={fromCurr}
                toCurr={toCurr}
                dispatch={dispatch}
                fromAmount={fromAmount}
                toAmount={toAmount}
                handleCurrencyConvert={handleCurrencyConvert}
                handleSwapCurrencies={handleSwapCurrencies}
                selectedToCurr={selectedToCurr}
                currSymbol={currSymbol}
                exchangeRate={exchangeRate}
                disableButtons={disableButtons}
                isHomePage={isHomePage}
                handleMoreDetails={handleMoreDetails}
            />

            <div className="HomePage-PopularCurr">
                { 
                    randomNumberArray.map((number,index)=>{
                        return(     
                        <div className='Curr-Cards'>
                        <div key={index}>
                            {fromAmount * popularExchangeRateArray[index]}{popularCurrArray[index]}</div>
                        </div>
                        )
                    }) 
                }
            </div>
        </div>
    )
}

export default HomePage;