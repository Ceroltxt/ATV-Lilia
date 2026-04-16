const formulario = document.getElementById('form-deletar-usuario');
const divResultado = document.getElementById('resultado-usuario');

async function deletarUsuario(event) {
    event.preventDefault();

      const usuarioId = document.getElementById('usuario-id').value;

      const confirmacao = confirm('Tem certeza que deseja deletar o usuário ' + usuarioId + '?');
    
    if (!confirmacao) {
        return;
    }

    try {
        const resposta = await fetch(
            'https://jsonplaceholder.typicode.com/users/' + usuarioId,
            {
                method: 'DELETE'
            }
        );

          if (!resposta.ok) {
            throw new Error('Erro ao deletar usuário');
        }

        divResultado.innerHTML = `
            <div style="background-color: #f8d7da; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <h3 style="color: #721c24;">✅ Usuário deletado com sucesso!</h3>
                <p>O usuário com ID ${usuarioId} foi removido da API.</p>
            </div>
        `;
        
        formulario.reset();
        } catch (erro) {
            console.error('Erro:', erro);
            divResultado.innerHTML = `<p style="color: red;">❌ Erro ao deletar: ${erro.message}</p>`;
        }
    }

    formulario.addEventListener('submit', deletarUsuario);