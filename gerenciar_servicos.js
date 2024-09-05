document.addEventListener('DOMContentLoaded', () => {
    let services = [];
    let currentId = 1;

    const serviceForm = document.getElementById('serviceForm');
    const serviceList = document.getElementById('serviceList');

    // Função para renderizar a lista de serviços
    function renderServiceList() {
        serviceList.innerHTML = '';
        services.forEach((service, index) => {
            const row = `
                <tr>
                    <th scope="row">${service.id}</th>
                    <td>${service.name}</td>
                    <td>${service.description}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editService(${index})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteService(${index})">Excluir</button>
                    </td>
                </tr>
            `;
            serviceList.innerHTML += row;
        });
    }

    // Função para adicionar ou editar um serviço
    serviceForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const serviceName = document.getElementById('serviceName').value;
        const serviceDescription = document.getElementById('serviceDescription').value;

        if (serviceForm.dataset.editingIndex) {
            const index = serviceForm.dataset.editingIndex;
            services[index] = {
                id: services[index].id,
                name: serviceName,
                description: serviceDescription
            };
            delete serviceForm.dataset.editingIndex;
        } else {
            services.push({
                id: currentId++,
                name: serviceName,
                description: serviceDescription
            });
        }

        serviceForm.reset();
        renderServiceList();
    });

    // Função para editar um serviço
    window.editService = function (index) {
        const service = services[index];
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceDescription').value = service.description;
        serviceForm.dataset.editingIndex = index;
    }

    // Função para excluir um serviço
    window.deleteService = function (index) {
        services.splice(index, 1);
        renderServiceList();
    }

    // Inicializa a lista de serviços
    renderServiceList();
});
