import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import Buy from './Buy';
import Sell from './Sell';

class OrderBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "All",
      valsell:false,
      valbuy:false,
      valall:true
    };
    
  }
  all = () => {
    this.setState({name:"all"});
    this.setState({valbuy:true});
    this.setState({valsell:true});
    this.setState({valall:false});

  }
  buy = () => {
    this.setState({name:"Buy"});
    this.setState({valbuy:true});
    this.setState({valsell:false});
    this.setState({valall:false});
  }
  sell = () => {
    this.setState({name:"Sell"});
    this.setState({valsell:true});
    this.setState({valbuy:false});
    this.setState({valall:false});
  }



  render() {
    let { bids, asks, websocketConnected, currentMarket } = this.props;
    return (
      <div>
        <div className="btn">
        <div id="all" onClick = {this.all}>All</div>
       
        <div id="buy" onClick = {this.buy}>Buy</div>
        <div id="sell" onClick = {this.sell}>Sell</div>
        </div>
       
        <div className="orderbook flex-column flex-1">
        <div className="flex header text-secondary">
          <div id="nums">
          <div className="col-6 text-right" >Amount</div>
          <div className="col-6 text-right" id="price">Price</div>
          <div className="col-6 text-right" id="total">Total</div>
          </div>
          
        </div>
        
        

        {this.state.valall ? <Buy bids={bids} asks={asks} websocketConnected={websocketConnected} currentMarket={currentMarket}/> : null}
       
        {this.state.valbuy ? <Buy bids={bids} asks={asks} websocketConnected={websocketConnected} currentMarket={currentMarket}/> : null}

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
          {this.state.valall ? <Sell bids={bids} asks={asks} websocketConnected={websocketConnected} currentMarket={currentMarket}/> : null}
        {this.state.valsell ? <Sell bids={bids} asks={asks} websocketConnected={websocketConnected} currentMarket={currentMarket}/> : null}
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