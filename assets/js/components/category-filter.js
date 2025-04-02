class CategoryFilter extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: 'open' });
        
        this.categories = [
            { id: 'todos', name: 'Todos' },
            { id: 'trabalho', name: 'Trabalho' },
            { id: 'estudo', name: 'Estudo' },
            { id: 'lazer', name: 'Lazer' },
            { id: 'outros', name: 'Outros' }
        ];
        
        this.selectedCategory = 'todos';
        
        this.render();
    }
    
    connectedCallback() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const categoryButtons = this.shadowRoot.querySelectorAll('button');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.setSelectedCategory(category);
                
                this.dispatchEvent(new CustomEvent('categoryChange', {
                    bubbles: true,
                    composed: true,
                    detail: { category }
                }));
            });
        });
    }
    
    setSelectedCategory(category) {
        this.selectedCategory = category;
        
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1rem;
                }
                
                .category-filter {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 20px;
                    background-color: #f1f1f1;
                    color: #333;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }
                
                button:hover {
                    background-color: #e1e1e1;
                }
                
                button.selected {
                    background-color: #4169E1;
                    color: white;
                }
                
                @media (max-width: 600px) {
                    .category-filter {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 0.5rem;
                    }
                    
                    button {
                        white-space: nowrap;
                    }
                }
                
                @media (prefers-color-scheme: dark) {
                    button {
                        background-color: #333;
                        color: #f1f1f1;
                    }
                    
                    button:hover {
                        background-color: #444;
                    }
                    
                    button.selected {
                        background-color: #4169E1;
                    }
                }
            </style>
            
            <div class="category-filter">
                ${this.categories.map(category => `
                    <button 
                        data-category="${category.id}" 
                        class="${this.selectedCategory === category.id ? 'selected' : ''}"
                    >
                        ${category.name}
                    </button>
                `).join('')}
            </div>
        `;
        
        if (this.isConnected) {
            this.setupEventListeners();
        }
    }
}

customElements.define('category-filter', CategoryFilter);