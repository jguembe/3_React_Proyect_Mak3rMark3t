import React from 'react';
import './Pedido.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

class Pedido extends React.Component {
    render() {
        let infoPedido = null;
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
          infoPedido = (
              <div id={this.props.pedido.idb} className="show">
                <div className="card-body">
                  Nombre y apellidos: {datos.nombre}<br/>
                  TLF: {datos.tlf}<br/>
                  E-mail: {datos.email}<br/>
                  Dirección: {datos.direccion}<br/>
                  CP: {datos.cp}<br/>
                  Localidad: {datos.localidad}<br/>
                  <button className="btn btn-sm btn-outline-danger ml-auto" onClick={this.props.borrar}>Eliminar</button>
                </div>
              </div>
          )
        }
        return (
            <>
              <div className="Pedido card mx-auto">
                <a onClick={this.props.showpedido}>
                  <div className="Pedido-header card-header">
                    <div className="row">

                      <h5 className="mb-0 ml-2">
                        <span className="mx-3">{flecha}</span> {this.props.pedido.idb}
                      </h5>

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
