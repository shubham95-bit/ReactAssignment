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
    
    const [buttonsDisabled, setButtonsDisabled] = useState(disableButtons);
    
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