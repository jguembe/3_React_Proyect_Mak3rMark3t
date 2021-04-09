import React from 'react';
import ProductoMin from '../../components/ProductoMin/ProductoMin';
import '../../components/ProductoMin/ProductoMin.css';

import { Link } from 'react-router-dom';


class RealizarPedido extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {

        let total = 0;

        let listaproductos = (
          <div>
            {this.props.cantidades.map((cantidad, id) => {
                if(cantidad>0){
                  total += this.props.cantidades[id]*this.props.listaproductos[id].precio ;
                  return <ProductoMin
                            key={id}
                            myid={id}
                            producto={this.props.listaproductos[id]}
                            cantidadX={this.props.cantidades[id]}
                        />
                }

            })}
          </div>
        )

        return (
            <>
                <h1>REALIZAR PEDIDO</h1>
                <p>Resumen Cesta - Confirmación pedido</p>
                {listaproductos}

                <div className="ProductoMin total mx-auto">
                   <div className="row">
                        <div className="col-md-4 my-auto">
                        </div>
                        <div className="col-md-4 my-auto">
                          <b>TOTAL</b>
                        </div>
                        <div  className="col-md-4 my-auto">
                            <b>{total} €</b>
                        </div>
                    </div>
                </div>
                <div className="my-3 py-3">
                    <Link to="/infoenvio" className="btn btn-primary">Continuar</Link>
                </div>
            </>
        )
    }
}

export default RealizarPedido;
