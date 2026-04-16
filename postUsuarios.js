const formulario = document.getElementById('form-novo-usuario');
const divResultado = document.getElementById('resultado-usuario');

async function criarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('usuario-nome').value;
    const email = document.getElementById('usuario-email').value;
    const telefone = document.getElementById('usuario-telefone').value;

      const novoUsuario = {
        name: nome,
        email: email,
        phone: telefone
    };

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });

         if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }
        
        const usuarioCriado = await response.json();

        divResultado.innerHTML = `
            <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <h3 style="color: #155724;">✅ Usuário criado com sucesso!</h3>
                <p><strong>ID:</strong> ${usuarioCriado.id}</p>
                <p><strong>Nome:</strong> ${usuarioCriado.name}</p>
                <p><strong>E-mail:</strong> ${usuarioCriado.email}</p>
                <p><strong>Telefone:</strong> ${usuarioCriado.phone}</p>
            </div>
        `;
        
        formulario.reset();

        }catch(erro){
            console.error('Erro:', erro);
            divResultado.innerHTML = `<p style="color: red;">❌ Erro ao criar usuário: ${erro.message}</p>`;
        }

    }

    formulario.addEventListener('submit', criarUsuario);