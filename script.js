document.getElementById('add-button').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText) {
        createTaskCard(taskText);
        taskInput.value = '';
    }
}

function createTaskCard(taskText) {
    const taskList = document.getElementById('task-list');

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = taskText;

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('task-actions');

    // Botão de riscar tarefa
    const okButton = document.createElement('button');
    okButton.innerHTML = '<i class="bi bi-pen"></i>';
    okButton.addEventListener('click', () => {
        taskTextElement.classList.toggle('strikethrough');
    });

    // Botão de adicionar imagem
    const imageButton = document.createElement('button');
    imageButton.innerHTML = '<i class="bi bi-image"></i>';
    imageButton.addEventListener('click', () => {
        document.getElementById('image-upload').click();
        document.getElementById('image-upload').onchange = function (event) {
            const file = event.target.files[0];
            if (file) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src); // Para liberar a memória
                taskCard.appendChild(img);
            }
        };
    });

    // Botão de deletar tarefa
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
    deleteButton.addEventListener('click', () => taskCard.remove());

    // Botão de abrir a câmera
    const cameraButton = document.createElement('button');
    cameraButton.innerHTML = '<i class="bi bi-camera"></i>';
    cameraButton.addEventListener('click', () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                taskCard.appendChild(video);
            })
            .catch((error) => {
                console.error('Erro ao acessar a câmera:', error);
            });
        } else {
            alert('Câmera não suportada pelo seu navegador.');
        }
    });

    actionsContainer.appendChild(okButton);
    actionsContainer.appendChild(imageButton);
    actionsContainer.appendChild(cameraButton);
    actionsContainer.appendChild(deleteButton);

    taskCard.appendChild(taskTextElement);
    taskCard.appendChild(actionsContainer);

    taskList.appendChild(taskCard);
}
