import React from 'react';
import './Producto.css';

class Producto extends React.Component {
    render() {

        return (
            <div className="Producto">
              <h5>{this.props.producto.nombre}</h5>
              <div>
                <img className="prod-img" src={this.props.producto.imagen}/>
                <h4>{this.props.producto.precio} € / Ud</h4>
              </div>
              <div>
                <button className="btn btn-sm btn-outline-primary" onClick={this.props.minus}>-</button>
                <span> {this.props.cantidadX} </span>
                <button className="btn btn-sm btn-outline-primary" onClick={this.props.plus}>+</button>
              </div>
            </div>
        )
    }
}

export default Producto;
