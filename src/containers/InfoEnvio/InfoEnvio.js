import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown,faCheck,faUser, faPhone, faEnvelope,faMapMarked, faCity} from '@fortawesome/free-solid-svg-icons';
import "./InfoEnvio.css";
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
        showmsg: false,
        msg: '',
        numprod: 0,
      }
    }
    componentWillMount(){
      let numprod = 0;
      let cantidades = [];
      // Preparar cantidades con su idb correspondiente
      this.props.cantidades.map((cantidad, id) => {

        let idb = null;
          if(cantidad>0){
            numprod++;
             idb = this.props.listaproductos[id].idb;
            console.log('X: '+idb+' : '+cantidad);
            cantidades.push({
                idb: idb,
                cantidad: cantidad,
            });
          }
      })
      this.setState({
        numprod: numprod,
        cantidades: cantidades
      });
    }

    componentDidMount() {
      console.log('<InfoEnvio> se ha montado');
    }

    grabaPedido = () => {
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

    comprobar = () => {
      let showmsg = false;
      let msg = '';
      if (this.state.nombre ==''){
        msg += " Nombre. ";
      }
      if(this.state.tlf== ''){
        msg += " Teléfono. ";
      }

      if( this.state.email== ''){
        msg += " E-mail. ";
      }
      if( this.state.direccion== ''){
        msg += " Dirección. ";
      }
      if( this.state.localidad== ''){
        msg += " Localidad. ";
      }
      if( this.state.cp== ''){
        msg += " Código postal. ";
      }
      if (msg != ''){
        this.setState({
          msg: msg,
          showmsg: true,
         })
      }else{
        this.grabaPedido();
      }
    }

    render() {
        let mensaje = null;
        let redireccion = null;
        let contenido = null;
        if(this.state.grabado){
            redireccion = (<div><Redirect to="/gracias" /></div>);
        }
        if(this.state.showmsg){
          if(this.state.msg!=''){
            mensaje = (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  Por favor rellene los siguientes campos:<br/>
                  <strong>{this.state.msg}</strong>
              </div>
            )
          }
        }
        if (this.state.numprod>0){
          contenido = (
            <div id="form" className="ancho mx-auto">
                {mensaje}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faUser} /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Nombre y apellidos"
                      onChange={(event) => this.setState({ nombre: event.target.value })}
                  />
                </div>

                <div className="row mb-3">
                <div className="input-group col-md-6">
                  <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faPhone} /> </span>
                    </div>
                    <input type="number" className="form-control" placeholder="666000444"
                        onChange={(event) => this.setState({ tlf: event.target.value })}
                    />
                  </div>
                  <div className="input-group col-md-6">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faEnvelope} /> </span>
                    </div>
                    <input type="email" className="form-control" placeholder="pedido@makermarket.com"
                        onChange={(event) => this.setState({ email: event.target.value })}
                    />
                  </div>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faMapMarked} /></span>
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
                      <span className="input-group-text" id="basic-addon1"> <FontAwesomeIcon icon={faCity} /> </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Localidad"
                        onChange={(event) => this.setState({ localidad: event.target.value })}
                    />
                  </div>
                </div>
                <button onClick={this.comprobar} className="btn btn-sm btn-success">
                  <FontAwesomeIcon icon={faCheck} /> REALIZAR PEDIDO
                </button>

            </div>
          )
        }else {
          contenido = (
            <>
              <div align="center">
                 <h4 className="my-5 mx-auto msg-error">
                     <p className="fs60"><FontAwesomeIcon icon={faFrown} /> </p>
                     Lo sentimos no hay pedidos pendientes.
                  </h4>
               </div>
            </>
          )
        }




        return (
            <>
                <h1>Información de envio</h1>
                {contenido}
                {redireccion}
            </>
        )
    }
}

export default InfoEnvio;
