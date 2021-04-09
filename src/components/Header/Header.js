import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <h1>{this.props.titulo}</h1>
                <p>¡Haz tu pedido ahora y recibelo en 24h!</p>
            </div>
        )
    }
}

export default Header;
