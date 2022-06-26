import ExchangeIcon from './exchangeicon.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const PageBody = (props) => {
    const navigate = useNavigate();
    const { 
            currencyList, 
            fromCurr,
            toCurr, 
            setFromCurrency,
            setToCurrency, 
            fromAmount, 
            ChangeFromAmount, 
            toAmount, 
            handleCurrencyConvert, 
            handleSwapCurrencies,
            selectedToCurr,
            currSymbol,
            exchangeRate,
            disableButtons,
            isHomePage,
            handleMoreDetails
        } = props;

    // let monthsArray = [];
    // let exchangeRateArray = [];
    var myHeaders = new Headers();

    myHeaders.append("apikey", "29PVT27k8eUCw8rYlKPbbGcZCqutwCK3");
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    
    const [buttonsDisabled, setButtonsDisabled] = useState(disableButtons);
    // const handleMoreDetails = async (curr1, curr2, amount) => {

    //     let monthsArray = [];
    //     let exchangeRateArray = [];

    //     await fetch(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=${'2021-01-31'}&end_date=${'2021-12-31'}&base=${curr1}&symbols=${curr2}`,requestOptions)
    //     .then(response => response.json())
    //     .then((result) => {
    //         console.log('result',result);
    //         // Code to Determine Last Date of every month
    //         for(let i=0; i<12; i++){
    //             var d = new Date(2021, i + 1, 0);
    //             let date = d.toString()
    //             function convertDate(inputFormat) {
    //                 function pad(s) { return (s < 10) ? '0' + s : s; }
    //                 var d = new Date(inputFormat)
    //                 return [d.getFullYear(), pad(d.getMonth()+1),  pad(d.getDate())].join('-')
    //             }
    //             monthsArray.push(convertDate(date));
    //             let dateValue = monthsArray[i];
    //             // console.log('dateValue',dateValue);
    //             let exchangeObject = result.rates[dateValue];
    //             // let targetCurr = curr2;
    //             console.log('exchangeObject',exchangeObject);
    //             exchangeRateArray.push(exchangeObject[curr2]);
    //             // console.log(monthsArray);
    //             console.log('exchangeRateArray',exchangeRateArray)    
    //             navigate('/DetailsPage',{state:{fromCurr: curr1, toCurr: curr2, currSymbol: currSymbol, fromAmount: amount, currencyList: currencyList, selectedToCurr: selectedToCurr, disableButtons: false, isHomePage: false, exchangeRateArray: exchangeRateArray, toAmount:toAmount, exchangeRate:exchangeRate, displayCurr:curr1}});
    //         }
    //     })

    // }

    return (
        <div className="HomePage-CurrExchange">
                <div className='Curr-Input'>
                    <div className='Curr-Input-Top'>
                        <label style={{marginLeft:'1vh'}}>Amount</label>
                        <input type='number' value={fromAmount} onChange={(e)=>{ChangeFromAmount(e); setButtonsDisabled(false)}}/>
                    </div>
                    <div className='Curr-Input-Bottom'>
                        <p>1.00 {fromCurr}={exchangeRate} {toCurr}</p>
                    </div>
                </div>
                <div className='Curr-Convert'>
                    <div className='Curr-Convert-Header'>
                        <div>
                            <label>From</label>
                            <div>
                                <select className='Curr-Select' value={fromCurr}
                                    onChange={(e)=>{setFromCurrency(e);console.log('fromcurr',fromCurr)}} 
                                    disabled={buttonsDisabled}
                                >
                                    {
                                        currencyList.map(curr=>(
                                            <option key={curr} value={curr}>{curr}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <button style={{backgroundColor:'#d5d5d5', border:'none', cursor:'pointer'}} onClick={handleSwapCurrencies}><img src={ExchangeIcon} style={{width:'100%', height:'100%'}} alt='Exchange'></img></button>
                        <div>
                            <label>To</label>
                            <div>
                                <select style={{marginRight: '1px'}} className='Curr-Select' value={toCurr} 
                                onChange={(e)=>{setToCurrency(e);console.log('toCurr',toCurr)}} disabled={buttonsDisabled}>
                                {
                                    currencyList.map(curr=>(
                                        <option key={curr} value={curr}>{curr}</option>
                                    ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='Curr-Convert-Body'>
                        <button type='button' className='Convert-Button' onClick={handleCurrencyConvert} disabled={buttonsDisabled}>Convert</button>
                    </div>
                    <div className='Curr-Convert-Footer'>
                    <div className={isHomePage ? 'Converted-Value-Home' : 'Converted-Value-Detail'}>
                        <p>{toAmount} {toCurr}</p>
                    </div>
                    <div className={isHomePage ? 'More-Det-Home' : 'More-Det-Details'}>
                    <button type='button' className='Convert-Button' onClick={()=>{handleMoreDetails(fromCurr, toCurr, fromAmount)}} disabled={buttonsDisabled}>More-Details</button>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default PageBody;