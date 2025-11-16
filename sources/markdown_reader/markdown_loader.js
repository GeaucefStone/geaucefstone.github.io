// File Loader for Markdown Documents
const documentRegistry = {
    'constitution': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/01B_constitution.md',
    'education': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/education.md',
    'laws': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/laws.md',
    'amendments': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/amendments.md',
    'rights': 'https://raw.githubusercontent.com/GeaucefStone/Secular_Democratic_Republic/main/contents/rights.md'
};

// Load a specific document by ID
function loadDocument(docId) {
    const url = documentRegistry[docId];
    if (!url) {
        console.error('Document not found:', docId);
        return false;
    }

    const output = document.getElementById('markdown-output');
    
    // Show loading state
    output.innerHTML = '<p style="text-align: center; color: #999;">Loading document...</p>';
    
    // Update URL without page reload
    window.history.pushState(null, '', `#${docId}`);
    
    // Use your existing markdown loader
    loadMarkdownFromGitHub(url);
    return true;
}

// Get all available document IDs
function getAvailableDocuments() {
    return Object.keys(documentRegistry);
}

// Get document URL by ID
function getDocumentUrl(docId) {
    return documentRegistry[docId];
}

// Initialize document loader
function initDocumentLoader() {
    // Load document from URL hash if present
    const initialDoc = window.location.hash.substring(1);
    if (initialDoc && documentRegistry[initialDoc]) {
        loadDocument(initialDoc);
    }
    
    return true;
}
