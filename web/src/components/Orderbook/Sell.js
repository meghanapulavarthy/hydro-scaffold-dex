import React from "react";
import Orderbook from "./index";
import { connect } from 'react-redux';
import './styles.scss';
import './Sell.css';

class Sell extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let { bids, asks, websocketConnected, currentMarket } = this.props;
        return(
            <div className="bids flex-column flex-1 overflow-hidden">
            {bids
              .slice(0, 20)
              .toArray()
              .map(([price, amount]) => {
                return (
                  <div className="bid flex align-items-center" key={price.toString()}>
                      <div id="design">
                    <div className="col-6 orderbook-amount text-right">
                      {amount.toFixed(2)}
                    </div>
                    <div className="col-6 text-success text-right">{price.toFixed(3)}</div>
                    <div >{(price.toFixed(currentMarket.priceDecimals)*amount.toFixed(currentMarket.amountDecimals)).toFixed(3)}</div>
                    </div>
                  </div>
                );
              })}
          </div>

        );
    }
}

export default Sell;