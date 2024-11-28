// Função para obter o último cliente do backend
async function obterCliente() {
    try {
        const response = await fetch('http://localhost:3000/api/clientes/ultimo');
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const cliente = await response.json();
        return cliente;
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar os dados do cliente');
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const olharCardapio = document.getElementById('olhar-cardapio');

    if (olharCardapio) {
        olharCardapio.addEventListener('click', async () => {
            const cliente = await obterCliente(); // Busca os dados do cliente
            if (!cliente) return;
        
            const { nomeCliente, numeroMesa } = cliente;
        
            // Notifica o gerente
            fetch('http://localhost:3000/notificacao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mensagem: 'O cliente está realizando o autoatendimento',
                    nomeCliente,
                    numeroMesa,
                }),
            });

            // Adiciona a classe para a animação de fade-out
            document.body.classList.add('fade-out-hidden');
                
            // Após 0.5 segundo (tempo da animação), redireciona para a página "escolha"
            setTimeout(function() {
                window.location.href = "cardapio.html";
            }, 500); // 500 milissegundos = 0.5 segundo
        });
    } else {
        console.error("Elemento 'olhar-cardapio' não encontrado!");
    }
});


// Configuração do modal para "Chamar Garçom"
document.getElementById('chamar-garcom').addEventListener('click', async () => {
    const cliente = await obterCliente(); // Busca os dados do cliente
    if (!cliente) return;

    const { nomeCliente, numeroMesa } = cliente;

    // Notifica o garçom
    fetch('http://localhost:3000/notificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mensagem: 'O cliente quer ser atendido presencialmente',
            nomeCliente,
            numeroMesa,
        }),
    });

    // Atualiza o modal com a mensagem personalizada
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerHTML = `
        Muito obrigado por usar o sistema, <strong>${nomeCliente}</strong>! O garçom já foi notificado e, em poucos minutos, irá para a sua mesa: <strong>${numeroMesa}</strong>!
        <br><br> Caso tenha mudado de ideia e queira fazer o pedido pelo sistema, clique no botão abaixo:
    `;

    // Mostra o modal
    document.getElementById('modal').classList.remove('hidden');
});

// Botão para o cliente mudar de ideia
document.getElementById('pedido-sistema').addEventListener('click', async () => {
    const cliente = await obterCliente(); // Busca os dados novamente caso necessário
    if (!cliente) return;

    const { nomeCliente } = cliente;

    // Notifica o garçom sobre a mudança
    fetch('http://localhost:3000/notificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mensagem: 'O cliente mudou de ideia e irá fazer o autoatendimento',
            nomeCliente,
        }),
    });

    // alert('O garçom foi notificado sobre sua decisão!');
    document.getElementById('modal').classList.add('hidden');

    // Adiciona a classe para a animação de fade-out
    document.body.classList.add('fade-out-hidden');
    
    // Após 0.5 segundo (tempo da animação), redireciona para a página "escolha"
    setTimeout(function() {
        window.location.href = "cardapio.html";
    }, 500); // 500 milissegundos = 0.5 segundo
});
