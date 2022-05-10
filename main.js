'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('cidade').value = endereco.localidade;
}

function limparAviso (aviso) {
    document.getElementById('cepn').style.display="none";
    document.getElementById('cepin').style.display="none";
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparAviso();
    limparFormulario();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('cepn').style.display="block";
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('cepin').style.display="block";
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);
