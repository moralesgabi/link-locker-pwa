(function() {
    const STORAGE_KEY = 'link-locker-links';
    const CATEGORIES_KEY = 'link-locker-categories';
    
    window.DB = {
        init() {
            if (!localStorage.getItem(STORAGE_KEY)) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            }
            if (!localStorage.getItem(CATEGORIES_KEY)) {
                localStorage.setItem(CATEGORIES_KEY, JSON.stringify(['Todas', 'Geral', 'Trabalho', 'Pessoal']));
            }
        },
        
        getAllLinks() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            } catch (error) {
                console.error('Erro ao obter links:', error);
                return [];
            }
        },
        
        getLinksByCategory(category) {
            const links = this.getAllLinks();
            
            if (category === 'Todas') {
                return links;
            }
            
            return links.filter(link => link.category === category);
        },
        
        getFilteredLinks(searchTerm = '', category = 'Todas') {
            let links = this.getAllLinks();
            
            if (category !== 'Todas') {
                links = links.filter(link => link.category === category);
            }
            
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                links = links.filter(link => 
                    link.title.toLowerCase().includes(term) || 
                    link.url.toLowerCase().includes(term) ||
                    (link.description && link.description.toLowerCase().includes(term))
                );
            }
            
            return links;
        },
        
        getLinkById(id) {
            const links = this.getAllLinks();
            return links.find(link => link.id === id) || null;
        },
        
        addLink(link) {
            try {
                const links = this.getAllLinks();
                links.unshift(link);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
                return true;
            } catch (error) {
                console.error('Erro ao adicionar link:', error);
                return false;
            }
        },
        
        updateLink(updatedLink) {
            try {
                const links = this.getAllLinks();
                const index = links.findIndex(link => link.id === updatedLink.id);
                
                if (index !== -1) {
                    links[index] = updatedLink;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
                    return true;
                }
                
                return false;
            } catch (error) {
                console.error('Erro ao atualizar link:', error);
                return false;
            }
        },
        
        deleteLink(id) {
            try {
                let links = this.getAllLinks();
                links = links.filter(link => link.id !== id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
                return true;
            } catch (error) {
                console.error('Erro ao excluir link:', error);
                return false;
            }
        },
        
        clearAllLinks() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
                return true;
            } catch (error) {
                console.error('Erro ao limpar links:', error);
                return false;
            }
        },
        
        getCategories() {
            try {
                return JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
            } catch (error) {
                console.error('Erro ao obter categorias:', error);
                return [];
            }
        },
        
        addCategory(category) {
            try {
                const categories = this.getCategories();
                if (!categories.includes(category)) {
                    categories.push(category);
                    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Erro ao adicionar categoria:', error);
                return false;
            }
        },
        
        deleteCategory(category) {
            try {
                let categories = this.getCategories();
                categories = categories.filter(cat => cat !== category);
                localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
                
                let links = this.getAllLinks();
                links = links.map(link => {
                    if (link.category === category) {
                        return {...link, category: 'Geral'};
                    }
                    return link;
                });
                localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
                
                return true;
            } catch (error) {
                console.error('Erro ao remover categoria:', error);
                return false;
            }
        }
    };
    
    DB.init();
})();