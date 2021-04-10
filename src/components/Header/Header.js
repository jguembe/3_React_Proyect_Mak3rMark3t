import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="Header row justify-content-center">
                <div className="col-md-2">
                  <img className="img-responsive img-logo" src="/favicon.ico"/>
                </div>
                <div className="col-md-4">
                <h1>{this.props.titulo}</h1>
                <p>¡Haz tu pedido ahora y recibelo en 24h!</p>
                </div>
            </div>
        )
    }
}

export default Header;
