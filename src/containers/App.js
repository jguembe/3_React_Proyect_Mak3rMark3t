import React from 'react';
import './App.css';
import Header from '../components/Header/Header';
import RealizarPedido from '../containers/RealizarPedido/RealizarPedido';
import InfoEnvio from '../containers/InfoEnvio/InfoEnvio';
import Gracias from '../containers/Gracias/Gracias';
import Pedidos from '../containers/Pedidos/Pedidos';

import Home from '../containers/Home/Home';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faList, faSpinner } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaproductos: [],
      cantidades: [],
      numprod: 0,
    }
  }

  getproducts = () => {
    var self = this;
    axios.get('https://dsm-proyecto-default-rtdb.firebaseio.com/productos.json')
        .then(function (response) {
            const producto = [];
            const cantidad1 = [];
            for (let key in response.data) {
                producto.push({
                    ...response.data[key],
                    idb: key
                });
                cantidad1.push(0);
            }
            console.log('Productos recibidos.');
            self.setState({
              cantidades: cantidad1,
              listaproductos: producto,
              numprod: 0
            });
        })
  }

  componentDidMount() {
    console.log('<HOME> se ha montado');
    this.getproducts();
  }

  suma = (id) => {
    let cantidades = [...this.state.cantidades];
    let listaproductos = [...this.state.listaproductos];
    let numprod = this.state.numprod;
    cantidades[id]++;
    numprod++;
    this.setState({
      cantidades: cantidades,
      listaproductos: listaproductos,
      numprod: numprod
    });
  }
  resta = (id) => {
    let cantidades = [...this.state.cantidades];
    let listaproductos = [...this.state.listaproductos];
    let numprod = this.state.numprod;
    if(cantidades[id]>0)
      cantidades[id]--;
      numprod--;
    this.setState({
      cantidades: cantidades,
      listaproductos: listaproductos,
      numprod: numprod
     });
  }


  render() {
    let prodbadge = null;
    if (this.state.numprod == 0){
      prodbadge = (<span className="badge badge-pill badge-secondary">{this.state.numprod}</span> );
    }else{
      prodbadge = (<span className="badge badge-pill badge-primary">{this.state.numprod}</span> );
    }


    return (

        <div className="App">
          <Header titulo="MaK3R MaRK3T" />
          <Router>
            <div>
              <nav className="">
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome} /> Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/realizarpedido" className="nav-link"><FontAwesomeIcon icon={faShoppingCart} /> Carrito {prodbadge}</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pedidos" className="nav-link"><FontAwesomeIcon icon={faList} /> Pedidos</Link>
                  </li>
                </ul>
              </nav>

              <Switch>
                <Route path="/gracias">
                  <Gracias />
                </Route>
                <Route path="/realizarpedido">
                  <RealizarPedido
                    cantidades={this.state.cantidades}
                    listaproductos={this.state.listaproductos}
                   />
                </Route>
                <Route path="/infoenvio">
                  <InfoEnvio
                      cantidades={this.state.cantidades}
                      listaproductos={this.state.listaproductos}
                      reiniciar={this.getproducts}
                    />
                </Route>
                <Route path="/pedidos">
                  <Pedidos />
                </Route>
                <Route path="/">
                  <Home
                      cantidades={this.state.cantidades}
                      listaproductos={this.state.listaproductos}
                      suma = {this.suma}
                      resta = {this.resta}
                      reiniciar={this.getproducts}
                    />
                </Route>

              </Switch>
            </div>
          </Router>
        </div>

    )
  }
}

export default App;
