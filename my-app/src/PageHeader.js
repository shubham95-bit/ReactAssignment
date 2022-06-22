import Logo from './Logo.png';
const PageHeader = () => {

    return (
        <div className="HomePage-Header">
            <img src={Logo} alt='Site Logo' style={{width:'90px',height:'90px'}}/>
            <div className='Curr-Box'>
                <div className='Curr-BoxItems'>
                    <button type='button' className='Curr-Button'>EUR-USD Details</button>
                </div>
                <div className='Curr-BoxItems'>
                    <button type='button' className='Curr-Button'>EUR-GBP Details</button>
                </div>
            </div>
        </div>
    )
}

export default PageHeader;