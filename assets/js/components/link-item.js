class LinkItem extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: 'open' });
        
        this._link = null;
    }
    
    get link() {
        return this._link;
    }
    
    set link(value) {
        this._link = value;
        this.render();
    }
    
    render() {
        if (!this._link) return;
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1rem;
                }
                
                .link-card {
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    background-color: white;
                    transition: transform 0.3s ease;
                    border-left: 5px solid var(--category-color, #4169E1);
                }
                
                .link-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }
                
                h3 {
                    margin-top: 0;
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                    color: #343A40;
                }
                
                .category-badge {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    margin-bottom: 0.5rem;
                    background-color: #f1f1f1;
                    color: #666;
                    text-transform: capitalize;
                }
                
                .link-url {
                    display: block;
                    margin-bottom: 0.75rem;
                    color: #0066cc;
                    word-break: break-all;
                    font-size: 0.9rem;
                }
                
                .link-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                
                .action-btn {
                    border: none;
                    background: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    color: #666;
                    transition: background-color 0.2s;
                    font-size: 0.85rem;
                }
                
                .action-btn:hover {
                    background-color: #f0f0f0;
                    color: #333;
                }
                
                .action-btn.edit-btn:hover {
                    color: #4169E1;
                }
                
                .action-btn.delete-btn:hover {
                    color: #DC3545;
                }
                
                .action-btn.share-btn:hover {
                    color: #28A745;
                }
                
                @media (prefers-color-scheme: dark) {
                    .link-card {
                        background-color: #1e1e1e;
                    }
                    
                    h3 {
                        color: #f0f0f0;
                    }
                    
                    .category-badge {
                        background-color: #333;
                        color: #ccc;
                    }
                    
                    .link-url {
                        color: #66b0ff;
                    }
                    
                    .action-btn {
                        color: #aaa;
                    }
                    
                    .action-btn:hover {
                        background-color: #2a2a2a;
                        color: #eee;
                    }
                }
            </style>
            
            <div class="link-card">
                <h3>${this._link.title}</h3>
                <span class="category-badge">${this._link.category}</span>
                <a class="link-url" href="${this._link.url}" target="_blank" rel="noopener noreferrer">
                    ${this._link.url}
                </a>
                <div class="link-actions">
                    <button class="action-btn visit-btn" title="Visitar Link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Visitar
                    </button>
                    <button class="action-btn edit-btn" title="Editar Link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Editar
                    </button>
                    <button class="action-btn share-btn" title="Compartilhar Link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        Compartilhar
                    </button>
                    <button class="action-btn delete-btn" title="Excluir Link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        `;
        
        const linkCard = this.shadowRoot.querySelector('.link-card');
        switch (this._link.category) {
            case 'trabalho':
                linkCard.style.setProperty('--category-color', '#0275d8');
                break;
            case 'estudo':
                linkCard.style.setProperty('--category-color', '#5cb85c');
                break;
            case 'lazer':
                linkCard.style.setProperty('--category-color', '#f0ad4e');
                break;
            default:
                linkCard.style.setProperty('--category-color', '#5bc0de');
        }
        
        this.addEventListeners();
    }
    
    addEventListeners() {
        const visitBtn = this.shadowRoot.querySelector('.visit-btn');
        const editBtn = this.shadowRoot.querySelector('.edit-btn');
        const shareBtn = this.shadowRoot.querySelector('.share-btn');
        const deleteBtn = this.shadowRoot.querySelector('.delete-btn');
        const linkUrl = this.shadowRoot.querySelector('.link-url');
        
        visitBtn.addEventListener('click', () => {
            window.open(this._link.url, '_blank', 'noopener noreferrer');
        });
        
        linkUrl.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(this._link.url, '_blank', 'noopener noreferrer');
        });
        
        editBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('edit', {
                bubbles: true,
                composed: true
            }));
        });
        
        shareBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('share', {
                bubbles: true,
                composed: true
            }));
        });
        
        deleteBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete', {
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('link-item', LinkItem);
