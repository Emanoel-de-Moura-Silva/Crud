import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import TabelaLivros from './components/TabelaLivros';
import CadastrarLivros from './components/CadastrarLivros';
import NotFound from './components/NotFound';

class App extends Component {
  
  state = {
    livros: [
      {
        id: 1,
        isbn: '978-85-7522-403-8',
        titulo: 'HTML5 - 2ª Edição',
        autor: 'Mauricio Samy Silva'
      },
      {
        id: 2,
        isbn: "978-85-7522-807-4",
        titulo: 'introdução ao Pentest',
        autor: 'Daniel Moreno'
      },
      {
        id: 3,
        isbn: '978-85-7522-780-8',
        titulo: 'Internet das Coisas para Desenvolvedores',
        autor: 'Ricardo da Silva Ogliarl'
      }
    ]
  };
    inserirLivro = (livro) => {
      livro.id = this.state.livros.length + 1;
      this.setState({
        livros: [...this.state.livros, livro]
      });
    };
    editarLivro = (livro) =>{
      const index = this.state.livros.findIndex((p) => p.id === livro.id);
      const livros = this.state.livros.slice(0, index).concat(this.state.livros.slice(index+1));
      const newLivros = [...livros,livro].sort((a,b) => a.id - b.id);
      this.setState({
        livros: newLivros
      })
    }
    removerLivro = (livro) => {
      if(window.confirm('Remover esse livro?')){
        const livros = this.state.livros.filter((p) => p.isnb !== livro.isbn);
        this.setState({livros})
      }
    }
    render() {
      return (
        <Router>
          <React.Fragment>
            <Menu />
            <Routes>
              <Route exact path="/" element={<TabelaLivros livros={this.state.livros} removerLivro={this.removerLivro} />} />
              <Route exact path="/cadastrar" element={<CadastrarLivros inserirLivro={this.inserirLivro} livro={{ id: 0, isbn: "", titulo: "", autor: "" }} />} />
              {/**Colocar a logica dessa porra no Component CadastrarLivros */}
              <Route path="/editar/:isbnLivro" element={(params) => {
                console.log('----'+params.isbnLivro)
                const livro = this.state.livros.find(livro => livro.isbn === params.isbnLivro);
                return livro ?
                  <CadastrarLivros editarLivro={this.editarLivro} livro={livro} /> :
                  <Navigate to="/" />;
              }} />
            </Routes>
          </React.Fragment>
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
    }
  }
  export default App;    