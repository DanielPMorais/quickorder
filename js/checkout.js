document.addEventListener('DOMContentLoaded', () => {
    const pedidoContainer = document.querySelector('.finalizar-pedido');
    const totalValor = document.querySelector('.total-valor');
    const continuarBtn = document.querySelector('.continuar-btn');
    const finalizarBtn = document.querySelector('.finalizar-btn');

    // Recupera o pedido do localStorage
    let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

    // Função para atualizar o DOM com o pedido
    function atualizarPedido() {
        pedidoContainer.innerHTML = ''; // Limpa os itens anteriores

        let total = 0; // Inicializa o total do pedido

        // Atualiza a interface com cada item
        pedido.forEach((item, index) => {
            const pedidoItem = document.createElement('div');
            pedidoItem.classList.add('pedido-item');

            pedidoItem.innerHTML = `
                <div class="quantidade-container">
                    <button class="quantidade-btn diminuir" data-index="${index}">-</button>
                    <span class="quantidade">${item.quantidade}</span>
                    <button class="quantidade-btn aumentar" data-index="${index}">+</button>
                </div>
                <span class="nome-item">${item.name}</span>
                <span class="preco-item">R$ ${(item.price * item.quantidade).toFixed(2)}</span>
                <button class="excluir-item" data-index="${index}">🗑️</button>
            `;

            pedidoContainer.appendChild(pedidoItem);
            total += item.price * item.quantidade; // Soma o total
        });

        // Atualiza o total no rodapé
        totalValor.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Eventos para manipular quantidades e excluir itens
    pedidoContainer.addEventListener('click', (event) => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains('aumentar')) {
            pedido[index].quantidade++;
        } else if (event.target.classList.contains('diminuir')) {
            if (pedido[index].quantidade > 1) {
                pedido[index].quantidade--;
            }
        } else if (event.target.classList.contains('excluir-item')) {
            pedido.splice(index, 1); // Remove o item do pedido
        }

        atualizarPedido(); // Re-renderiza os itens
        localStorage.setItem('pedido', JSON.stringify(pedido)); // Atualiza o localStorage
    });

    // Botão "Continuar comprando"
    continuarBtn.addEventListener('click', () => {
        window.location.href = 'cardapio.html';
    });

    // Botão "Finalizar pedido"
    finalizarBtn.addEventListener('click', () => {
        alert('Pedido finalizado!'); // Aqui você pode implementar a lógica de envio do pedido
        localStorage.removeItem('pedido'); // Limpa o pedido do localStorage
    });

    // Inicializa a página com os dados do pedido
    atualizarPedido();
});
