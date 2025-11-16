// Navigation handler - uses the file loader
document.addEventListener('DOMContentLoaded', function() {
    // Initialize document loader
    initDocumentLoader();
    
    // Set up sidebar click handlers
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const docId = this.getAttribute('href').substring(1); // Remove #
            
            // Use the file loader to load the document
            if (loadDocument(docId)) {
                // Update active state
                document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Set initial active state based on URL hash
    const initialDoc = window.location.hash.substring(1);
    if (initialDoc) {
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${initialDoc}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const docId = window.location.hash.substring(1);
    if (docId) {
        loadDocument(docId);
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${docId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
});
