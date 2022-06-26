import PageHeader from './PageHeader';
import PageBody from './PageBody';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
    const [randomNumberArray, setRandomNumberArray] = useState([]);
    const [popularCurrArray, setPopularCurrArray] = useState([]);
    const [popularExchangeRateArray, setPopularExchangeRateArray]= useState([]);

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
        
        setRandomNumberArray([...tempRandomNumberArray]);
        setPopularCurrArray([...tempPopularCurrArray]);
        setPopularExchangeRateArray([...tempPopularExchangeRateArray])
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