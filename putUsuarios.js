const formulario = document.getElementById('form-atualizar-usuario');
const divResultado = document.getElementById('resultado-usuario');

async function atualizarUsuario(event) {
    event.preventDefault();

    const usuarioId = document.getElementById('usuario-id').value;
    const nome = document.getElementById('usuario-nome').value;
    const email = document.getElementById('usuario-email').value;

     const usuarioAtualizado = {
        id: usuarioId,
        name: nome,
        email: email
    };

     try {

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users/' + usuarioId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioAtualizado)
            }
        );

          if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }
        
        const resultado = await response.json();

        divResultado.innerHTML = `
            <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <h3 style="color: #155724;">✅ Usuário atualizado com sucesso!</h3>
                <p><strong>ID:</strong> ${resultado.id}</p>
                <p><strong>Novo Nome:</strong> ${resultado.name}</p>
                <p><strong>Novo E-mail:</strong> ${resultado.email}</p>
            </div>
        `;

          formulario.reset();
        }catch(erro){
            console.error('Erro:', erro);
        divResultado.innerHTML = `<p style="color: red;">❌ Erro ao atualizar: ${erro.message}</p>`;
        }

    }

    formulario.addEventListener('submit', atualizarUsuario);

