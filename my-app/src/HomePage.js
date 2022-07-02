import PageHeader from './PageHeader';
import PageBody from './PageBody';
import { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// const initialState = {
//     currencyList: [],
//     fromCurr: 'EUR',
//     toCurr: 'USD',
//     fromAmount: 1,
//     toAmount: 1,
//     exchangeRate: 1,
//     selectedToCurr: 'USD',
//     symbolList: {},
//     currSymbol: '',
//     randomNumberArray: [],
//     popularCurrArray: [],
//     popularExchangeRateArray: []
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'setCurrencyList':
//             return { currencyList: [...Object.keys(action.payload.rates)]}
        
//         case 'setFromCurr':
//             return { fromCurr: action.payload.curr}    
            
//         case 'setToCurr':
//             return { toCurr: action.payload.curr}
            
//         case 'setFromAmount':
//             return { fromAmount: action.payload.amount}
                
//         case 'setToAmount':
//             return { toAmount: action.payload.amount}
        
//         case 'setExchangeRate':
//             return { exchangeRate: action.payload.exchRate}
            
//         case 'setSelectedToCurr':
//             return { selectedToCurr: action.payload.curr}
        
//         case 'setSymbolList':
//             return { symbolList: {...action.payload.symbols}}
            
//         case 'setCurrSymbol':
//             return { currSymbol: action.payload.symbol}
        
//         case 'setRandomNumberArray':
//             return { randomNumberArray: [...action.payload.arr]}

//         case 'setPopularCurrArray':
//             return { popularCurrArray: [...action.payload.arr]}
        
//         case 'setPopularExchangeRateArray':
//             return { popularExchangeRateArray: [...action.payload.arr]}
//     }
// }
const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const [disableButtons, setDisableButtons] = useState(location.state.disableButtons);
    // const [isHomePage, setIsHomePage] = useState(location.state.isHomePage);
    const [currencyList, setCurrencyList] = useState([])
    const [fromCurr, setFromCurr] = useState('EUR');
    const [toCurr, setToCurr] = useState('USD');
    const [fromAmount, setFromAmount] = useState(1);
    const [toAmount, setToAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [selectedToCurr, setSelectedToCurr] = useState('USD');
    const [symbolList, setSymbolList] = useState({});
    const [currSymbol, setCurrSymbol] = useState('');
    const [disableButtons, setDisableButtons] = useState(location.state.disableButtons);
    const [isHomePage, setIsHomePage] = useState(location.state.isHomePage); 
    const [randomNumberArray, setRandomNumberArray] = useState([]);
    const [popularCurrArray, setPopularCurrArray] = useState([]);
    const [popularExchangeRateArray, setPopularExchangeRateArray]= useState([]);

    // const [state, dispatch] = useReducer(reducer, initialState);
    // const { currencyList, 
    //         fromCurr, 
    //         toCurr, 
    //         fromAmount, 
    //         toAmount, 
    //         exchangeRate, 
    //         selectedToCurr, 
    //         symbolList, 
    //         currSymbol,
    //         randomNumberArray, 
    //         popularCurrArray, 
    //         popularExchangeRateArray
    //     } = state;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "29PVT27k8eUCw8rYlKPbbGcZCqutwCK3");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
    useEffect(()=>{
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=EUR`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            // dispatch({ type: 'setCurrencyList', payload: { rates: result.rates } })
            setCurrencyList([...Object.keys(result.rates)]);
            let tempExchRate = result.rates[toCurr];
            // dispatch({ type: 'setExchangeRate', payload: { exchRate: tempExchRate} })
            setExchangeRate(result.rates[toCurr]);
            let calculatedAmount = fromAmount * tempExchRate;
            // dispatch({ type: 'setToAmount', payload: { amount: calculatedAmount } })
            setToAmount(calculatedAmount);

        })
        .catch(error => console.log('error', error));

        //Fetching the symbols of Currencies
        fetch(`https://api.apilayer.com/exchangerates_data/symbols`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            // dispatch({ type: 'setSymbolList', payload: { symbols: result.symbols } })
            setSymbolList({...result.symbols});
            let currSymbol = result.symbols[fromCurr];
            // dispatch({ type: 'setCurrSymbol', payload: { symbol: currSymbol } })
            setCurrSymbol(currSymbol);
        })
        .catch(error => console.log('error',error));

    },[])

    //To Update the currency symbol whenever the fromCurr is Changing so that correct symbol can be updated for the details page
    useEffect(()=>{ 
        if(symbolList){
            let currSymbol = symbolList[fromCurr];
            // dispatch({type:'setCurrSymbol', payload:{ symbol: currSymbol}})
            setCurrSymbol(currSymbol);
        }
    },[fromCurr])

    const handleCurrencyConvert = () =>{
        fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurr}`,requestOptions)
        .then(response => response.json())
        .then((result) => {
            let tempExchangeRate = result.rates[toCurr];
            // dispatch({ type: 'setExchangeRate', payload: { exchRate: tempExchangeRate} })
            setExchangeRate(tempExchangeRate);
            let calculatedAmount = fromAmount * tempExchangeRate;
            // dispatch({type: 'setToAmount', payload: {amount: calculatedAmount}})
            setToAmount(calculatedAmount);
            // dispatch({type: 'setSelectedToCurr', payload: { curr: toCurr }})
            setSelectedToCurr(toCurr);

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
        // dispatch({type: 'setRandomNumberArray', payload: { arr: tempRandomNumberArray }})
        setRandomNumberArray([...tempRandomNumberArray]);
        // dispatch({type: 'setPopularCurrArray ', payload: { arr: tempPopularCurrArray }})
        setPopularCurrArray([...tempPopularCurrArray]);
        // dispatch({type: 'setPopularExchangeRateArray', payload: { arr: tempPopularExchangeRateArray }})
        setPopularExchangeRateArray([...tempPopularExchangeRateArray])
        })
        .catch(error => console.log('error',error));
    }

    const handleSwapCurrencies = () => {
        let curr1 = fromCurr;
        let curr2 = toCurr;
        // dispatch({type: 'setFromCurr', payload: { curr: curr2 }})
        setFromCurr(curr2);
        // dispatch({type: 'setToCurr', payload: { curr: curr1 }})
        setToCurr(curr1);
    }

    const handleMoreDetails = async (curr1, curr2, amount) => {

        let monthsArray = [];
        let exchangeRateArray = [];
        
        await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${'2021-01-31'}&end_date=${'2021-12-31'}&base=${curr1}&symbols=${curr2}`,requestOptions)
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
                // let targetCurr = curr2;
                exchangeRateArray.push(exchangeObject[curr2]);  
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
                handleMoreDetails={handleMoreDetails}
            />

            {/* <PageBody
                currencyList={currencyList}
                fromCurr={fromCurr}
                toCurr={toCurr}
                dispatch={dispatch}
                // setFromCurrency={(e) => {setFromCurr(e.target.value)}}
                // setToCurrency={(e) => {setToCurr(e.target.value)}}
                fromAmount={fromAmount}
                // ChangeFromAmount={(e)=> {setFromAmount(e.target.value)}}
                toAmount={toAmount}
                handleCurrencyConvert={handleCurrencyConvert}
                handleSwapCurrencies={handleSwapCurrencies}
                selectedToCurr={selectedToCurr}
                currSymbol={currSymbol}
                exchangeRate={exchangeRate}
                disableButtons={disableButtons}
                isHomePage={isHomePage}
                handleMoreDetails={handleMoreDetails}
            /> */}

            <div className="HomePage-PopularCurr">
                { 
                    randomNumberArray.map((number,index)=>{
                            return(
                                <div className='Curr-Cards'>
                                    <div>{fromAmount * popularExchangeRateArray[index]} {popularCurrArray[index]}</div>
                                </div>
                            )
                        }) 
                }
            </div>
        </div>
    )
}

export default HomePage;