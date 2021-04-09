import React from 'react';
import axios from 'axios';

import Pedido from '../../components/Pedido/Pedido';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Pedidos extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        idelim: null,
        idbelim: null,
        show: false,
        confirm: false,
        listapedidos: [],
      }
    }

    getorders = () => {
      var self = this;
      axios.get('https://dsm-proyecto-default-rtdb.firebaseio.com/pedidos.json')
          .then(function (response) {
              const pedidos = [];
              for (let key in response.data) {
                  pedidos.push({
                      ...response.data[key],
                      idb: key
                  });
              }
              console.log('Pedidos recibidos.');
              console.log(pedidos);
              self.setState({ listapedidos: pedidos });
          })
    }
    componentDidMount() {
      console.log('<Pedidos> se ha montado');
      this.getorders();
    }

    borrarpedido = () => {
      axios.delete('https://dsm-proyecto-default-rtdb.firebaseio.com/pedidos/' + this.state.idbelim + '.json')
        .then(response => {
          console.log(response);
          alert("PEdido borrado");
        });
      let pedidos = [...this.state.listapedidos];
      pedidos.splice(this.state.idelim, 1);
      this.setState({
        idelim: null,
        idbelim: null,
        show:false,
        confirm:false,
        listapedidos: pedidos
      });
    }

    showmodal = (statex,id,idb) => {
      let pedidos = [...this.state.listapedidos];
      let idx = id;
      let idbx = idb;
      if(!statex){
        idx = null;
        idb = null;
      }
      this.setState({
        idelim: idx,
        idbelim: idbx,
        show:statex,
        confirm:false,
        listapedidos: pedidos
      });
    }


    render() {
        let pedidos = null;
        if (this.state.listapedidos!=null){
          pedidos = (
            <div className="p-2">
              {this.state.listapedidos.map((pedido, id) => {
                  return <Pedido
                            key={id}
                            pedido={pedido}
                            borrar={() => this.showmodal(true,id,pedido.idb)}
                        />
              })}
            </div>
          )

        }

        return (
            <>
                <h1>PEDIDOS</h1>
                {pedidos}

                <Modal show={this.state.show} onHide={() => this.showmodal(false)} animation={true} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>¿Estás seguro de que quieres eliminar el pedido {this.state.idbelim}?</Modal.Body>
                  <Modal.Footer>

                    <Button variant="danger" onClick={() => this.borrarpedido()}>
                      ELIMINAR
                    </Button>
                    <Button variant="secondary"  onClick={() => this.showmodal(false)}>
                      Cancelar
                    </Button>
                  </Modal.Footer>
                </Modal>

            </>
        )
    }
}

export default Pedidos;
