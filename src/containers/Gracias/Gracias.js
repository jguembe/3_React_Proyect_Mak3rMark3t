import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Gracias extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      console.log('<Gracias> se ha montado');
    }

    render() {

        return (
            <>
                <h2>Pedido completado</h2>
                <div id="" className="ancho mx-auto">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <strong>Gracias por confiar en nosotros! </strong><br/>
                         El pedido se ha guardado correctamente.
                        En breve recibirá su compra.
                    </div>
                    <div className="my-3 py-3">
                        <Link to="/" className="btn btn-sm btn-primary">SEGUIR COMPRANDO</Link>
                    </div>
                </div>
            </>
        )
    }
}

export default Gracias;
