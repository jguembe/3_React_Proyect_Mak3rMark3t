import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class InfoEnvio extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nombre: '',
        tlf: '',
        email: '',
        direccion: '',
        localidad: '',
        cp: '',
        grabado: false,
        cantidades: [],
      }
    }

    componentDidMount() {
      console.log('<InfoEnvio> se ha montado');
    }

    grabaPedido = () => {
      // Preparar cantidades con su idb correspondiente
      this.props.cantidades.map((cantidad, id) => {
        let idb = null;
          if(cantidad>0){
             idb = this.props.listaproductos[id].idb;
            console.log('X: '+idb+' : '+cantidad);
            this.state.cantidades.push({
                idb: idb,
                cantidad: cantidad,
            });
          }

      })
      console.log(this.state.cantidades);
        const data = {
          infoEnvio: {
            nombre: this.state.nombre,
            tlf: parseInt(this.state.tlf),
            email: this.state.email,
            direccion: this.state.direccion,
            localidad: this.state.localidad,
            cp:  parseInt(this.state.cp),
          },
          cantidades: this.state.cantidades
        };
      axios.post('https://dsm-proyecto-default-rtdb.firebaseio.com/pedidos.json', data)
          .then(response => {
              this.props.reiniciar(); // Reseteamos carrito
              this.setState({grabado:true}); // Enviamos a pantalla Gracias!
          }).catch(error => {
              alert("ERROR AL GRABAR PEDIDO");
              this.setState({grabado:false});
          });
    }

    render() {
        let redireccion = null;
        if(this.state.grabado){
            redireccion = (<div><Redirect to="/gracias" /></div>);
        }

        return (
            <>
                <h1>Información de envio</h1>
                <div id="form" className="ancho mx-auto">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Nombre y apellidos: </span>
                      </div>
                      <input type="text" className="form-control" placeholder="Nombre"
                          onChange={(event) => this.setState({ nombre: event.target.value })}
                      />
                    </div>

                    <div className="row mb-3">
                    <div className="input-group col-md-6">
                      <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"> TLF: </span>
                        </div>
                        <input type="number" className="form-control" placeholder="666000444"
                            onChange={(event) => this.setState({ tlf: event.target.value })}
                        />
                      </div>
                      <div className="input-group col-md-6">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"> E-mail: </span>
                        </div>
                        <input type="email" className="form-control" placeholder="pedido@makermarket.com"
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                      </div>
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Dirección: </span>
                      </div>
                      <input type="text" className="form-control" placeholder="Dirección"
                          onChange={(event) => this.setState({ direccion: event.target.value })}
                      />
                    </div>

                    <div className="row mb-3">
                    <div className="input-group col-md-6">
                      <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"> CP: </span>
                        </div>
                        <input type="number" className="form-control" placeholder="31190"
                            onChange={(event) => this.setState({ cp: event.target.value })}
                        />
                      </div>
                      <div className="input-group col-md-6">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1"> Localidad: </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Localidad"
                            onChange={(event) => this.setState({ localidad: event.target.value })}
                        />
                      </div>
                    </div>
                    <button onClick={this.grabaPedido} className="btn btn-sm btn-primary">REALIZAR PEDIDO</button>
                    {redireccion}
                </div>
            </>
        )
    }
}

export default InfoEnvio;
