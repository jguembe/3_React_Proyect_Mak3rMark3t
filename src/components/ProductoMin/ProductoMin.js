import React from 'react';
import './ProductoMin.css';

class ProductoMin extends React.Component {
    render() {

        return (

            <div className="ProductoMin mx-auto">
               <div className="row">
                    <div className="col-md-4 my-auto">
                      <img className="prod-img-min" src={this.props.producto.imagen}/>


                    </div>
                    <div className="col-md-4 my-auto">
                      {this.props.producto.nombre}
                    </div>
                    <div  className="col-md-4 my-auto">
                        {this.props.cantidadX} x {this.props.producto.precio} = {this.props.producto.precio*this.props.cantidadX} €
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductoMin;
