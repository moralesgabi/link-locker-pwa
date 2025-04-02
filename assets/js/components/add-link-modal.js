class AddLinkModal extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isEditing = false;
      this.currentId = null;
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      const categories = db.getCategories();
      
      this.shadowRoot.innerHTML = `
        <style>
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .modal-overlay.visible {
            display: flex;
            opacity: 1;
          }
          
          .modal-content {
            background: white;
            width: 90%;
            max-width: 500px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            transform: translateY(20px);
            transition: transform 0.3s;
            max-height: 90vh;
            overflow-y: auto;
          }
          
          .modal-overlay.visible .modal-content {
            transform: translateY(0);
          }
          
          .modal-header {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .modal-title {
            margin: 0;
            font-size: 1.2rem;
            color: #333;
          }
          
          .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
          }
          
          .modal-body {
            padding: 1.5rem;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: #333;
            font-weight: 500;
          }
          
          input, select, textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
          }
          
          textarea {
            min-height: 100px;
            resize: vertical;
          }
          
          input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #4a89dc;
            box-shadow: 0 0 0 2px rgba(74, 137, 220, 0.2);
          }
          
          .modal-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid #e0e0e0;
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
          }
          
          .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .btn-cancel {
            background: white;
            border: 1px solid #e0e0e0;
            color: #333;
          }
          
          .btn-cancel:hover {
            background: #f5f5f5;
          }
          
          .btn-submit {
            background: #4a89dc;
            border: 1px solid #4a89dc;
            color: white;
          }
          
          .btn-submit:hover {
            background: #3a70c2;
          }
        </style>
        
        <div class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">${this.isEditing ? 'Editar Link' : 'Adicionar Novo Link'}</h3>
              <button class="close-btn">&times;</button>
            </div>
            
            <div class="modal-body">
              <div class="form-group">
                <label for="linkTitle">Título</label>
                <input type="text" id="linkTitle" placeholder="Digite um título para o link" required>
              </div>
              
              <div class="form-group">
                <label for="linkUrl">URL</label>
                <input type="url" id="linkUrl" placeholder="https://exemplo.com" required>
              </div>
              
              <div class="form-group">
                <label for="linkCategory">Categoria</label>
                <select id="linkCategory" required>
                  ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                  <option value="_new">+ Nova Categoria</option>
                </select>
              </div>
              
              <div class="form-group" id="newCategoryGroup" style="display: none;">
                <label for="newCategory">Nova Categoria</label>
                <input type="text" id="newCategory" placeholder="Digite o nome da nova categoria">
              </div>
              
              <div class="form-group">
                <label for="linkDescription">Descrição (Opcional)</label>
                <textarea id="linkDescription" placeholder="Adicione uma descrição sobre este link"></textarea>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="btn btn-cancel">Cancelar</button>
              <button class="btn btn-submit">${this.isEditing ? 'Salvar Alterações' : 'Adicionar Link'}</button>
            </div>
          </div>
        </div>
      `;
    }
  
    setupEventListeners() {
      this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.close());
      this.shadowRoot.querySelector('.btn-cancel').addEventListener('click', () => this.close());
      this.shadowRoot.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) this.close();
      });

      this.shadowRoot.getElementById('linkCategory').addEventListener('change', (e) => {
        const newCategoryGroup = this.shadowRoot.getElementById('newCategoryGroup');
        newCategoryGroup.style.display = e.target.value === '_new' ? 'block' : 'none';
      });

      this.shadowRoot.querySelector('.btn-submit').addEventListener('click', () => this.submitForm());
    }
  
    open(linkData = null) {
      this.isEditing = !!linkData;
      this.currentId = linkData?.id || null;
      this.render();
      this.setupEventListeners();
      
      if (linkData) {
        this.shadowRoot.getElementById('linkTitle').value = linkData.title;
        this.shadowRoot.getElementById('linkUrl').value = linkData.url;
        this.shadowRoot.getElementById('linkCategory').value = linkData.category;
        this.shadowRoot.getElementById('linkDescription').value = linkData.description || '';
      }
      
      this.shadowRoot.querySelector('.modal-overlay').style.display = 'flex';
      this.shadowRoot.getElementById('linkTitle').focus();
    }
  
    close() {
      this.shadowRoot.querySelector('.modal-overlay').style.display = 'none';
    }
  
    submitForm() {
      const title = this.shadowRoot.getElementById('linkTitle').value.trim();
      const url = this.shadowRoot.getElementById('linkUrl').value.trim();
      const categorySelect = this.shadowRoot.getElementById('linkCategory');
      let category = categorySelect.value;
      const description = this.shadowRoot.getElementById('linkDescription').value.trim();

      if (!title || !url) {
        alert('Por favor, preencha pelo menos o título e a URL');
        return;
      }

      if (category === '_new') {
        category = this.shadowRoot.getElementById('newCategory').value.trim();
        if (!category) {
          alert('Por favor, digite o nome da nova categoria');
          return;
        }
        db.addCategory(category);
      }

      const event = new CustomEvent('link-saved', {
        bubbles: true,
        detail: {
          id: this.currentId,
          title,
          url,
          category,
          description
        }
      });
      this.dispatchEvent(event);

      this.close();
    }
  }
  
  customElements.define('add-link-modal', AddLinkModal);