document.addEventListener('DOMContentLoaded', () => {

    const voltarEscolha = document.getElementById('voltar-escolha');
    const combos = document.querySelectorAll('.combo'); // Todos os combos
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const addToOrder = document.getElementById('add-to-order');
    const comboTitle = document.getElementById('combo-title');
    const comboDescription = document.getElementById('combo-description');
    const comboPrice = document.getElementById('combo-price');

    let pedido = []; // Armazena os itens do pedido

    // Abre o modal ao clicar em um combo
    combos.forEach((combo, index) => {
        combo.addEventListener('click', () => {
            const comboName = combo.querySelector('h4').textContent;
            const comboPriceText = combo.querySelector('p').textContent;

            comboTitle.textContent = comboName;
            comboDescription.textContent = `Descrição do ${comboName}.`; // Aqui você pode adicionar descrições específicas
            comboPrice.textContent = `Preço: ${comboPriceText}`;

            modal.classList.remove('hidden'); // Mostra o modal
        });
    });

    // Fecha o modal quando clicar no fundo (fora do conteúdo)
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { // Verifica se o clique foi exatamente no fundo do modal
            modal.classList.add('hidden'); // Adiciona a classe para esconder o modal
        }
    });

    // Fecha o modal ao clicar no botão "Fechar"
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Adiciona o combo ao pedido
    addToOrder.addEventListener('click', () => {
        const combo = {
            name: comboTitle.textContent,
            price: comboPrice.textContent.replace('Preço: R$', '').trim()
        };
        pedido.push(combo);
        atualizarResumoPedido();
        modal.classList.add('hidden'); // Fecha o modal
    });

    // Atualiza o resumo do pedido no footer
    function atualizarResumoPedido() {
        const footer = document.querySelector('.resumo-pedido');
        footer.innerHTML = '<div class="item-resumo"></div> <div class="item-soma"><p>Total: </p></div>'; // Limpa o conteúdo anterior
   

        const footerDiv = document.querySelector('.item-resumo');
        const footerDivBtn = document.querySelector('.item-soma');
        const footerDivBtnSpan = document.querySelector('.item-soma p');

        let total = 0;

        pedido.forEach((item, index) => {
            const itemResumo = document.createElement('p');
            itemResumo.textContent = `${item.name} - R$ ${item.price}`;
            footerDiv.appendChild(itemResumo);
            total += parseFloat(item.price);
        });

        const continuarBtn = document.createElement('button');
        continuarBtn.textContent = 'Continuar >';
        continuarBtn.addEventListener('click', () => {
            document.body.classList.add('fade-out-hidden');
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 500);
        });
        footerDivBtn.appendChild(continuarBtn);

        const somarItens = document.createElement('span');
        somarItens.textContent = `R$${total.toFixed(2)}`;
        footerDivBtnSpan.appendChild(somarItens);
    }

    // Animação de sair da página "Cardápio"
    if (voltarEscolha) {
        voltarEscolha.addEventListener('click', () => {
            localStorage.setItem('pedido', JSON.stringify(pedido));
            document.body.classList.add('fade-out-hidden');
            setTimeout(() => {
                window.location.href = 'escolha.html';
            }, 500);
        });
    } else {
        console.error("Elemento 'voltar-escolha' não encontrado!");
    }

});
