import Logo from './Logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const PageHeader = (props) => {
    const navigate = useNavigate();
    const [fromCurr, setFromCurr] = useState(props.fromCurr);
    const [toCurr, setToCurr] = useState(props.toCurr);
    const [currSymbol, setCurrSymbol]= useState(props.currSymbol);
    // const [currencyList, setCurrencyList] = useState(props.currencyList);
    console.log('currency List in Page Header:',props.currencyList);
    // console.log('currSymbol',currSymbol)

    const handleDetailsButton = (curr1, curr2) =>{
        console.log('curr1',curr1);
        console.log('curr2',curr2);
        // setFromCurr(curr1);
        // setToCurr(curr2);
        navigate('/DetailsPage',{state:{fromCurr: curr1, toCurr: curr2, currSymbol: currSymbol, fromAmount: 1, currencyList: props.currencyList, selectedToCurr: curr2, disableButtons: false, isHomePage: false, toAmount:props.toAmount,
        exchangeRate:props.exchangeRate}});
    }
    return (
        <div className="HomePage-Header">
            <img src={Logo} alt='Site Logo' style={{width:'90px',height:'90px'}}/>
            <div className='Curr-Box'>
                <div className='Curr-BoxItems'>
                    <button type='button' className='Curr-Button' onClick={()=>{handleDetailsButton('EUR','USD')}}>EUR-USD Details</button>
                </div>
                <div className='Curr-BoxItems'>
                    <button type='button' className='Curr-Button' onClick={()=>{handleDetailsButton('EUR','GBP')}}>EUR-GBP Details</button>
                </div>
            </div>
        </div>
    )
}

export default PageHeader;