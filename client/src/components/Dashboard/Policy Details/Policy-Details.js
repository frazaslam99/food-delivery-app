import React from 'react';
import './css/policy-Details.css';



class PolicyDetails extends React.Component {
    render() {
        return (
            <div className='PD_Most_Main_div'> 
            <hr />
                <div className='PD_Main_Component'>
                    <div className='PD_Delivery_Div'> DELIVERY ALL OVER PAKISTAN</div>
                    <div className='PD_ReturnPolicy_div'>15-DAYS RETURN POLICY</div>
                    <div className='PD_exchange_div'>EXCHANGEABLE POLICY</div>
                </div>
                <hr />
            </div>


        )
    }
}
export default PolicyDetails;