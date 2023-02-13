import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
    <>
    <h1>404!</h1>
    <p>
        Lamento. Essa pagina não existe ou foi removida <br/>
        <Link to='/'>Voltar para Tabela de Livros</Link>
    </p>
    </>
}
export default NotFound;