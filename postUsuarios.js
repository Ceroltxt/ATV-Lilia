const formulario = document.getElementById('form-novo-usuario');
const divResultado = document.getElementById('resultado-usuario');

//Função assíncrona que executa o PUT na API
async function criarUsuario(event) {
    
    //Inicia barrando o comportamento padrão do navegador de reiniciar a página
    event.preventDefault();

    //Recuperando as informações necessárias do forms para a criação de um User object
    const nome = document.getElementById('usuario-nome').value;
    const email = document.getElementById('usuario-email').value;
    const telefone = document.getElementById('usuario-telefone').value;

    //Atribuindo os dados recuperados a propriedades do objeto
      const novoUsuario = {
        name: nome,
        email: email,
        phone: telefone
    };

    //Usando try e catch pra estrutura de controle....
    
      try {
          //a const response espera pela busca realizada na API.
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // informa ao navegador o tipo de conteúdo enviado
            },
            body: JSON.stringify(novoUsuario) // convertendo nosso objeto para JSON
        });

          //caso response tenha um status diferente de ok, lançamos um erro para ser visualizado.
         if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }

        // a const usuarioCriado espera pela conversão da response em JSON.
        const usuarioCriado = await response.json();

          //formatando nosso resultado é inserindo no HTML
        divResultado.innerHTML = `
            <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <h3 style="color: #155724;">✅ Usuário criado com sucesso!</h3>
                <p><strong>ID:</strong> ${usuarioCriado.id}</p>
                <p><strong>Nome:</strong> ${usuarioCriado.name}</p>
                <p><strong>E-mail:</strong> ${usuarioCriado.email}</p>
                <p><strong>Telefone:</strong> ${usuarioCriado.phone}</p>
            </div>
        `;
        
        formulario.reset(); //Limpa o formulário

        }catch(erro){
            console.error('Erro:', erro);
            divResultado.innerHTML = `<p style="color: red;">❌ Erro ao criar usuário: ${erro.message}</p>`;
        } //Caso as ações em try falhem, o código cái dentro de catch, que imprime o erro dentro do HTML e dentro do console.

    }

    formulario.addEventListener('submit', criarUsuario); // Liga o formulário ao código via "escutadores"
