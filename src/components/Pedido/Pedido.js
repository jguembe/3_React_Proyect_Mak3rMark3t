import React from 'react';
import './Pedido.css';
import ProductoMin from '../../components/ProductoMin/ProductoMin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

class Pedido extends React.Component {
  constructor(props) {
    super(props);

  }
    render() {
        let infoPedido = null;
        let listaproductos = null;
        let total = 0;
        let flecha = (<FontAwesomeIcon icon={faAngleRight} />);
        if(this.props.mostrar){
          flecha = (<FontAwesomeIcon icon={faAngleDown} />);
          let datos = {
            nombre: '',
            tlf: '',
            email: '',
            direccion: '',
            localidad: '',
            cp: '',
          };
          if (this.props.pedido.infoEnvio != null){
            datos.nombre = this.props.pedido.infoEnvio.nombre;
            datos.tlf = this.props.pedido.infoEnvio.tlf;
            datos.email = this.props.pedido.infoEnvio.email;
            datos.direccion = this.props.pedido.infoEnvio.direccion;
            datos.localidad = this.props.pedido.infoEnvio.localidad;
            datos.cp = this.props.pedido.infoEnvio.cp;

          }
          if (this.props.pedido.cantidades != null){
            listaproductos = (
              <>
                <b>Productos pedidos:</b>
                {this.props.pedido.cantidades.map((c, id) => {
                    if(c.cantidad>0){
                      total += c.cantidad*this.props.listaproductos[this.props.pedido.cantidades[id].idb].precio ;
                      return <ProductoMin
                                key={id}
                                producto={this.props.listaproductos[this.props.pedido.cantidades[id].idb]}
                                cantidadX={this.props.pedido.cantidades[id].cantidad}
                            />
                    }

                })}
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
              </>
            )

          }

          infoPedido = (
              <div id={this.props.pedido.idb} className="show">
                <div className="card-body">
                  <div className="row my-3">
                    <div className="col-md-6">
                      {listaproductos}
                    </div>
                    <div className="col-md-6">
                      <b>Información de envio:</b><br/>
                      Nombre y apellidos: {datos.nombre}<br/>
                      TLF: {datos.tlf}<br/>
                      E-mail: {datos.email}<br/>
                      Dirección: {datos.direccion}<br/>
                      CP: {datos.cp}<br/>
                      Localidad: {datos.localidad}<br/>
                    </div>
                  </div>

                  <button className="btn btn-outline-danger ml-auto" onClick={this.props.borrar}>Eliminar</button>

              </div>
              </div>

          )
        }
        let fecha = null;
        if (this.props.pedido.fecha !=null){
          fecha = new Date(this.props.pedido.fecha).toLocaleDateString('es');
        }
        return (
            <>
              <div className="Pedido card mx-auto">
                <a onClick={this.props.showpedido}>
                  <div className="Pedido-header card-header">
                      <div className="d-flex justify-content-between">
                        <div className="">{flecha}
                          <span className="mx-3">{fecha}</span>
                        </div>
                        <div className="">{this.props.pedido.infoEnvio.nombre}</div>
                        <div className=""></div>
                      </div>
                  </div>
                </a>
                {infoPedido}
              </div>
            </>
        )
    }
}

export default Pedido;
