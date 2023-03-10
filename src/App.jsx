import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import TabelaLivros from "./components/TabelaLivros";
import CadastrarLivros from "./components/CadastrarLivros";
import NotFound from "./components/NotFound";
import SimpleStorage from 'react-simple-storage';
import Login from "./components/Login";
import TabelaHome from "./components/TabelaHome";

class App extends Component {
  state = {
    livros: [
      {
        id: 1,
        isbn: "978-85-7522-403-8",
        titulo: "HTML5 - 2ª Edição",
        autor: "Maurício Samy Silva",
      },
      {
        id: 2,
        isbn: "978-85-7522-807-4",
        titulo: "Introdução ao Pentest",
        autor: "Daniel Moreno",
      },
      {
        id: 3,
        isbn: "978-85-7522-780-8",
        titulo: "Internet das Coisas para Desenvolvedores",
        autor: "Ricardo da Silva Ogliari",
      },
    ],
    isAuthenticated: false,
  };

  inserirLivro = (livro) => {
    livro.id = this.state.livros.length + 1;
    this.setState({
      livros: [...this.state.livros, livro],
    });
  };

  editarLivro = (livro) => {
    const index = this.state.livros.findIndex((p) => p.id === livro.id);
    const livros = this.state.livros
      .slice(0, index)
      .concat(this.state.livros.slice(index + 1));
    const newLivros = [...livros, livro].sort((a, b) => a.id - b.id);
    this.setState({
      livros: newLivros,
    });
  };
  removerLivro = (livro) => {
    if(window.confirm("Remover Livro?")){
      const livros = this.state.livros.filter((p) => p.isbn !== livro.isbn);
      this.setState({livros})
    }
  }
  componentDidMount(){
    this.setState({isAuthenticated: false,})
  }

  render() {
    return (
      <Router>
        <SimpleStorage parent={this}/>
        <Header isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => this.state.isAuthenticated === false ? (
            <TabelaHome livros={this.state.livros} removerLivro={this.removerLivro} />
            ): (
            <TabelaLivros
               livros={this.state.livros}
               removerLivro={this.removerLivro}
                />
                )
              }
          />
          <Route
            exact
            path="/cadastrar"
            render={() => (
              <CadastrarLivros
                inserirLivro={this.inserirLivro}
                livro={{ id: 0, isbn: "", titulo: "", autor: "" }}
              />
            )}
          />
          <Route
          exact
          path='/login'
          render={() => <Login/>} />
          <Route
            exact
            path="/editar/:isbnLivro"
            render={(props) => {
              const livro = this.state.livros.find(
                (livro) => livro.isbn === props.match.params.isbnLivro
              );
              if (livro) {
                return (
                  <CadastrarLivros
                    editarLivro={this.editarLivro}
                    livro={livro}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
