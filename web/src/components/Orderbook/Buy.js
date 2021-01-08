import React from "react";
import Orderbook from "./index";
import { connect } from 'react-redux';
import './styles.scss';
import './Buy.css';

class Buy extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let { bids, asks, websocketConnected, currentMarket } = this.props;
        return(
            <div className="flex-column flex-1">
          <div className="asks flex-column flex-column-reverse flex-1 overflow-hidden">
            {asks
              .slice(-20)
              .reverse()
              .toArray()
              .map(([price, amount]) => {
                return (
                  <div className="ask flex align-items-center" key={price.toString()}>
                      <div id="designbuy">
                    <div className="col-6 orderbook-amount text-right">
                      {amount.toFixed(2)}
                    </div>
                    <div className="col-6 text-danger text-right">{price.toFixed(3)}</div>
                    <div >{(price.toFixed(currentMarket.priceDecimals)*amount.toFixed(currentMarket.amountDecimals)).toFixed(3)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          </div>

        );
    }
}

export default Buy;