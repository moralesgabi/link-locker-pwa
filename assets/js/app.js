let isEditing = false;
let editingId = null;
const DB = window.DB;

const linkForm = document.getElementById('link-form');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const categorySelect = document.getElementById('category');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const linksList = document.getElementById('links-list');
const noLinksDiv = document.getElementById('no-links');
const connectionStatus = document.getElementById('connection-status');

document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    
    renderLinks();
    
    monitorConnectionStatus();

    linkForm.addEventListener('submit', handleFormSubmit);
    cancelButton.addEventListener('click', resetForm);
    
    document.addEventListener('categoryChange', (e) => {
        renderLinks(e.detail.category);
    });
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    const category = categorySelect.value;
    
    if (!isValidURL(url)) {
        alert('Por favor, insira uma URL válida que comece com http:// ou https://');
        return;
    }
    
    const link = {
        id: isEditing ? editingId : Date.now().toString(),
        title,
        url,
        category,
        createdAt: isEditing ? DB.getLinkById(editingId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (isEditing) {
        DB.updateLink(link);
    } else {
        DB.addLink(link);
    }
    
    resetForm();
    renderLinks();
    
    showNotification(isEditing ? 'Link atualizado com sucesso!' : 'Link adicionado com sucesso!');
}

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    return pattern.test(url);
}

function editLink(id) {
    const link = DB.getLinkById(id);
    if (!link) return;
    
    titleInput.value = link.title;
    urlInput.value = link.url;
    categorySelect.value = link.category;
    
    isEditing = true;
    editingId = id;
    saveButton.textContent = 'Atualizar';
    cancelButton.style.display = 'inline-block';
    
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
}

function deleteLink(id) {
    if (confirm('Tem certeza que deseja excluir este link?')) {
        DB.deleteLink(id);
        renderLinks();
        showNotification('Link excluído com sucesso!');
    }
}

function shareLink(link) {
    if (navigator.share) {
        navigator.share({
            title: link.title,
            text: `Confira este link: ${link.title}`,
            url: link.url
        })
        .then(() => showNotification('Link compartilhado com sucesso!'))
        .catch(err => console.error('Erro ao compartilhar:', err));
    } else {
        alert(`Copie este link: ${link.url}`);
        
        try {
            navigator.clipboard.writeText(link.url);
            showNotification('Link copiado para a área de transferência!');
        } catch (err) {
            console.error('Erro ao copiar para área de transferência:', err);
        }
    }
}

function renderLinks(categoryFilter = 'todos') {
    linksList.innerHTML = '';
    
    let links = DB.getAllLinks();
    
    if (categoryFilter !== 'todos') {
        links = links.filter(link => link.category === categoryFilter);
    }
    
    links.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    if (links.length === 0) {
        noLinksDiv.classList.remove('hidden');
    } else {
        noLinksDiv.classList.add('hidden');
        
        links.forEach(link => {
            const linkElement = document.createElement('link-item');
            linkElement.link = link;
            linkElement.addEventListener('edit', () => editLink(link.id));
            linkElement.addEventListener('delete', () => deleteLink(link.id));
            linkElement.addEventListener('share', () => shareLink(link));
            linksList.appendChild(linkElement);
        });
    }
}

function resetForm() {
    linkForm.reset();
    isEditing = false;
    editingId = null;
    saveButton.textContent = 'Salvar';
    cancelButton.style.display = 'none';
}

function showNotification(message) {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function monitorConnectionStatus() {
    function updateStatus() {
        if (navigator.onLine) {
            connectionStatus.classList.add('hidden');
        } else {
            connectionStatus.classList.remove('hidden');
        }
    }
    
    updateStatus();
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
}

window.appActions = {
    editLink,
    deleteLink,
    shareLink
};