import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Producto from '../../components/Producto/Producto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Home extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log('<HOME> se ha montado');
    }

    render() {
          let footer = null;
          let listaproductos = null;
          let total = 0;
          if (this.props.listaproductos!=null){
            listaproductos = (
              <div className="mb-5 pb-5">
                {this.props.listaproductos.map((producto, id) => {
                    total += this.props.cantidades[id] * producto.precio;
                    return <Producto
                              key={id}
                              producto={producto}
                              plus={() => this.props.suma(id)}
                              minus={() => this.props.resta(id)}
                              cantidadX={this.props.cantidades[id]}
                          />
                })}
              </div>
            )
          }

          if (total>0){
            footer = (
              <footer className="footer fixed-bottom mt-auto py-3 bg-light">
                <div className="container">
                    <span className="mx-3 my-auto"> TOTAL: {total} € </span>
                    <Link to="/realizarpedido" className="btn btn-sm btn-primary my-auto">
                      <FontAwesomeIcon icon={faArrowRight} /> REALIZAR PEDIDO
                    </Link>
                    <button className="btn btn-sm  ml-5 btn-danger my-auto" onClick={this.props.reiniciar} type="button">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
              </footer>
            )
          }

        return (
            <>
              {listaproductos}
              {footer}
            </>
        )
    }
}

export default Home;
