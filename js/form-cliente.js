document.getElementById('clienteForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir o reload da página

    // Adiciona a classe para a animação de fade-out
    document.body.classList.add('fade-out-hidden');
    
    // Após 0.5 segundo (tempo da animação), redireciona para a página "escolha"
    setTimeout(function() {
        window.location.href = "escolha.html";
    }, 500); // 500 milissegundos = 0.5 segundo

    // Capturar os dados do formulário
    const numeroMesa = document.getElementById('numero-mesa').value;
    const nomeCliente = document.getElementById('nome-cliente').value;

    // Criar o JSON para envio
    const dados = {
        numeroMesa: parseInt(numeroMesa),
        nomeCliente: nomeCliente,
    };

    try {
        // Enviar os dados para o backend
        const resposta = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (resposta.ok) {
            const respostaJSON = await resposta.json();
            // alert(respostaJSON.message); // Exibir mensagem de sucesso
        } else {
            alert('Erro ao enviar os dados. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});




// // Classe Base
// class Notification {
//     constructor(type, message) {
//         this.type = type;
//         this.message = message;
//     }

//     notify() {
//         return `${this.type} Notification: ${this.message}`;
//     }
// }

// // Factory Method
// class NotificationFactory {
//     static createNotification(type, message) {
//         switch (type) {
//             case 'Order':
//                 return new Notification('Order', message);
//             case 'CallWaiter':
//                 return new Notification('CallWaiter', message);
//             default:
//                 throw new Error('Unknown notification type');
//         }
//     }
// }

// // Uso
// const orderNotification = NotificationFactory.createNotification('Order', 'New order at table 5!');
// const callWaiterNotification = NotificationFactory.createNotification('CallWaiter', 'Table 3 is calling for assistance.');

// console.log(orderNotification.notify());
// console.log(callWaiterNotification.notify());


// // Model: Gerencia os dados
// class OrderModel {
//     constructor() {
//         this.orders = [];
//     }

//     addOrder(order) {
//         this.orders.push(order);
//     }

//     getOrders() {
//         return this.orders;
//     }
// }

// // View: Interface do usuário
// class OrderView {
//     displayOrders(orders) {
//         orders.forEach((order, index) => {
//             console.log(`Order ${index + 1}: ${order}`);
//         });
//     }
// }

// // Controller: Intermediação entre Model e View
// class OrderController {
//     constructor(model, view) {
//         this.model = model;
//         this.view = view;
//     }

//     addOrder(order) {
//         this.model.addOrder(order);
//         this.updateView();
//     }

//     updateView() {
//         const orders = this.model.getOrders();
//         this.view.displayOrders(orders);
//     }
// }

// // Uso
// const orderModel = new OrderModel();
// const orderView = new OrderView();
// const orderController = new OrderController(orderModel, orderView);

// orderController.addOrder('Pizza');
// orderController.addOrder('Pasta');


// // Classe Subject
// class OrderNotifier {
//     constructor() {
//         this.waiters = []; // Lista de observadores
//     }

//     subscribe(waiter) {
//         this.waiters.push(waiter);
//     }

//     unsubscribe(waiter) {
//         this.waiters = this.waiters.filter(w => w !== waiter);
//     }

//     notify(order) {
//         this.waiters.forEach(waiter => waiter.update(order));
//     }
// }

// // Classe Observer
// class Waiter {
//     constructor(name) {
//         this.name = name;
//     }

//     update(order) {
//         console.log(`${this.name} received notification: New order - ${order}`);
//     }
// }

// // Uso
// const notifier = new OrderNotifier();

// const waiter1 = new Waiter('John');
// const waiter2 = new Waiter('Doe');

// notifier.subscribe(waiter1);
// notifier.subscribe(waiter2);

// notifier.notify('Burger and Fries');
// notifier.unsubscribe(waiter1);
// notifier.notify('Pizza Margherita');


