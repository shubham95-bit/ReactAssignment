import ExchangeIcon from './exchangeicon.png'
const PageBody = (props) => {

    const { 
            currencyList, 
            fromCurr,
            toCurr, 
            ChangeFromCurrency,
            ChangeToCurrency, 
            fromAmount, 
            ChangeFromAmount, 
            toAmount, 
            handleCurrencyConvert, 
            handleSwapCurrencies,
            selectedToCurr 
        } = props;
    return (
        <div className="HomePage-CurrExchange">
                <div className='Curr-Input'>
                    <div className='Curr-Input-Top'>
                        <label style={{marginLeft:'1vh'}}>Amount</label>
                        <input type='number' value={fromAmount} onChange={(e)=>{ChangeFromAmount(e)}}/>
                    </div>
                    <div className='Curr-Input-Bottom'>
                        <p>1.00EUR==XX.XX USD</p>
                    </div>
                </div>
                <div className='Curr-Convert'>
                    <div className='Curr-Convert-Header'>
                        <div>
                            <label>From</label>
                            <div>
                                <select className='Curr-Select' value={fromCurr} onChange={(e)=>{ChangeFromCurrency(e)}}>
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
                                <select style={{marginRight: '1px'}} className='Curr-Select' value={toCurr} onChange={ChangeToCurrency}>
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
                        <button type='button' className='Convert-Button' onClick={handleCurrencyConvert}>Convert</button>
                    </div>
                    <div className='Curr-Convert-Footer'>
                    <div className='Converted-Value'>
                        <p>{toAmount} {selectedToCurr}</p>
                    </div>
                    <div className='More-Det'>
                    <button type='button' className='Convert-Button'>More-Details</button>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default PageBody;