function loadDocument(docId) {
    const url = documentRegistry[docId];
    if (!url) {
        console.error('Document not found:', docId);
        return false;
    }

    // Call the markdown loader function
    loadMarkdownFromGitHub(url);
    
    // Update URL and active states...
    return true;
}
