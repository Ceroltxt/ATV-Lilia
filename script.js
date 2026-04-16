const botaoBuscar = document.getElementById('btn-buscar');
const divListaUsuarios = document.getElementById('lista-usuarios');

async function buscarUsuarios(params) {
    botaoBuscar.innerText = "Buscando, calma ae";
    botaoBuscar.disabled = true;

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if(!response.ok){
            throw new Error (`Erro: Status ${response.status}`);
        }

        const usuarios = await response.json();

        divListaUsuarios.innerHTML = ' ';

        usuarios.forEach(usuario => {
            const cartao = document.createElement('div');
            cartao.classList.add('cartao-usuario');

            cartao.innerHTML = `
             <h3>${usuario.name}</h3>
                <p><strong>E-mail:</strong> ${usuario.email}</p>
                <p><strong>Cidade:</strong> ${usuario.address.city}</p>
                <p><strong>Empresa:</strong> ${usuario.company.name}</p>
            `;

            divListaUsuarios.appendChild(cartao);
        });
        
    }catch (erro){
        console.error("Erro:", erro);

        divListaUsuarios.innerHTML = `<p style="color: red;">Erro ao carregar os dados.</p>`;
    } finally {
        botaoBuscar.innerText = "Buscar Usuários";
        botaoBuscar.disabled = false;
    }

}

botaoBuscar.addEventListener('click', buscarUsuarios);