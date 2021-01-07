import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';

class OrderBook extends React.Component {
  constructor(props) {
    super(props);
    this.lastUpdatedAt = null;
    this.forceRenderTimer = null;

    
  
  }



  // max 1 render in 1 second
  // shouldComponentUpdate() {
  //   if (this.lastUpdatedAt) {
  //     const diff = new Date().valueOf() - this.lastUpdatedAt;
  //     const shouldRender = diff > 1000;

  //     if (!shouldRender && !this.forceRenderTimer) {
  //       this.forceRenderTimer = setTimeout(() => {
  //         this.forceUpdate();
  //         this.forceRenderTimer = null;
  //       }, 1000 - diff);
  //     }
  //     return shouldRender;
  //   } else {
  //     return true;
  //   }
  // }

  componentWillUnmount() {
    if (this.forceRenderTimer) {
      clearInterval(this.forceRenderTimer);
    }
  }

  componentDidUpdate() {
    this.lastUpdatedAt = new Date();
  }

  

  render() {
  
    let { bids, asks, websocketConnected, currentMarket } = this.props;

    const sell = () => {
      
      asks
              .slice(-20)
              .reverse()
              .toArray()
              .map(([price, amount]) => {
                return (
                  <div className="bids flex-column flex-1 overflow-hidden" >
                    <div className="ask flex align-items-center" key={price.toString()}>
                    <div className="col-6 orderbook-amount text-right">
                      {amount.toFixed(currentMarket.amountDecimals)}
                    </div>
                    <div className="col-6 text-danger text-right">{price.toFixed(currentMarket.priceDecimals)}</div>
                  </div>
                  </div>
                  
                );
              })
    }

  const  buy = () => {
      bids
              .slice(0, 20)
              .toArray()
              .map(([price, amount]) => {
                return (
                  <div className="asks flex-column flex-column-reverse flex-1 overflow-hidden">
                    <div className="bid flex align-items-center" key={price.toString()}>
                    <div className="col-6 orderbook-amount text-right">
                      {amount.toFixed(currentMarket.amountDecimals)}
                    </div>
                    <div className="col-6 text-success text-right">{price.toFixed(currentMarket.priceDecimals)}</div>
                  </div>
                  </div>
                  
                  
                );
                
              })
    }

 
   

    



    return (
      <div className="orderbook flex-column flex-1">
        <div class="btns">
        <button id="all" onClick={buy()}>All</button>
        <button id="buy" onClick={buy()}>Buy</button>
        <button id="sell" onClick={sell()}>sell</button>
        </div>
        
        <div className="flex header text-secondary">
          <div className="col-6 text-right">Amount</div>
          <div className="col-6 text-right">price</div>
        </div>
        <div className="flex-column flex-1">
         
          <div className="status border-top border-bottom">
            {websocketConnected ? (
              <div className="col-6 text-success">
                <i className="fa fa-circle" aria-hidden="true" /> RealTime
              </div>
            ) : (
              <div className="col-6 text-danger">
                <i className="fa fa-circle" aria-hidden="true" /> Disconnected
              </div>
            )}
          </div>
          {/* <div className="bids flex-column flex-1 overflow-hidden" >
            
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    asks: state.market.getIn(['orderbook', 'asks']),
    bids: state.market.getIn(['orderbook', 'bids']),
    loading: false,
    currentMarket: state.market.getIn(['markets', 'currentMarket']),
    websocketConnected: state.config.get('websocketConnected'),
    theme: state.config.get('theme')
  };
};

export default connect(mapStateToProps)(OrderBook);
