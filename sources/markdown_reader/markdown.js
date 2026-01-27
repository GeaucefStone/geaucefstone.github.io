// Markdown Parser - Pure parsing functionality with media support
// Universal loader function: loadMarkdownFromUrl() - works with any platform
(function() {
    // Focus on bold, italic (underscores only), links, images, and videos
    function processBold(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    function processItalic(text) {
        return text.replace(/_(.*?)_/g, '<em>$1</em>');
    }

    function processLinks(text) {
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }

    // Process images: ![alt text](image-url)
    function processImages(text) {
        return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, alt, src) {
            const altText = alt || 'Image';
            return `<div class="markdown-image-container">
                <img src="${src}" alt="${altText}" class="markdown-image" loading="lazy">
                ${alt ? `<div class="markdown-image-caption">${alt}</div>` : ''}
            </div>`;
        });
    }

    // Process videos: ![VIDEO](video-url) convention
    function processVideos(text) {
        return text.replace(/!\[VIDEO\]\(([^)]+)\)/g, function(match, src) {
            const videoExt = src.split('.').pop().toLowerCase();
            const videoType = getVideoMimeType(videoExt);
            
            return `<div class="markdown-video-container">
                <video class="markdown-video" controls preload="metadata">
                    <source src="${src}" type="${videoType}">
                    Your browser does not support the video tag.
                </video>
                <div class="markdown-video-controls">
                    <button class="video-play-btn" onclick="togglePlay(this)">Play</button>
                    <input type="range" class="video-volume" min="0" max="1" step="0.1" value="1" onchange="setVolume(this)">
                </div>
            </div>`;
        });
    }

    // Helper function to get video MIME type
    function getVideoMimeType(extension) {
        const mimeTypes = {
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg',
            'ogv': 'video/ogg',
            'mov': 'video/quicktime',
            'avi': 'video/x-msvideo',
            'wmv': 'video/x-ms-wmv',
            'flv': 'video/x-flv',
            'mkv': 'video/x-matroska'
        };
        return mimeTypes[extension] || 'video/mp4';
    }

    function processInlineMarkdown(text) {
        let processed = processVideos(text);
        processed = processImages(processed);
        processed = processLinks(processed);
        processed = processItalic(processed);
        processed = processBold(processed);
        return processed;
    }

    // Function to parse markdown tables
    function parseTable(lines, startIndex) {
        let tableLines = [];
        let i = startIndex;
        
        while (i < lines.length && lines[i].trim().includes('|')) {
            tableLines.push(lines[i]);
            i++;
        }
        
        if (tableLines.length < 2) return { html: '', newIndex: startIndex };
        
        let html = '<table>';
        let hasHeader = false;
        
        for (let j = 0; j < tableLines.length; j++) {
            let line = tableLines[j].trim();
            if (line.startsWith('|')) line = line.substring(1);
            if (line.endsWith('|')) line = line.substring(0, line.length - 1);
            
            let cells = line.split('|').map(cell => cell.trim());
            if (cells.length === 0 || cells.every(cell => cell === '')) continue;
            
            let isSeparator = cells.every(cell => /^:?-+:?$/.test(cell));
            if (isSeparator) continue;
            
            html += '<tr>';
            for (let k = 0; k < cells.length; k++) {
                if (j === 0 && !hasHeader) {
                    html += '<th>' + processInlineMarkdown(cells[k]) + '</th>';
                } else {
                    html += '<td>' + processInlineMarkdown(cells[k]) + '</td>';
                }
            }
            html += '</tr>';
            
            if (j === 0) hasHeader = true;
        }
        
        html += '</table>';
        return { html: html, newIndex: i - 1 };
    }

    // Check if a line is a list item
    function isListItem(line) {
        const trimmed = line.trim();
        return trimmed.startsWith('- ') || trimmed.startsWith('* ');
    }

    // Main Markdown parsing function
    function parseMarkdown(md) {
        let lines = md.split('\n');
        let result = [];
        let currentListType = null;
        let inList = false;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // Check for table
            if (line.trim().includes('|') && !isListItem(line)) {
                let tableLinesCount = 1;
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim().includes('|') && !isListItem(lines[j])) {
                        tableLinesCount++;
                    } else {
                        break;
                    }
                }

                if (tableLinesCount >= 2) {
                    const tableResult = parseTable(lines, i);
                    if (tableResult.html) {
                        if (inList) {
                            result.push('</ul>');
                            inList = false;
                            currentListType = null;
                        }
                        
                        result.push(tableResult.html);
                        i = tableResult.newIndex;
                        continue;
                    }
                }
            }
            
            // Handle list items
            if (isListItem(line)) {
                const trimmed = line.trim();
                const listType = trimmed.startsWith('- ') ? 'solid' : 'hollow';
                const listContent = trimmed.substring(2);
                
                if (!inList) {
                    const listStyle = listType === 'solid' ? 'disc' : 'circle';
                    result.push(`<ul style="list-style-type: ${listStyle};">`);
                    inList = true;
                    currentListType = listType;
                } else if (listType !== currentListType) {
                    result.push('</ul>');
                    const listStyle = listType === 'solid' ? 'disc' : 'circle';
                    result.push(`<ul style="list-style-type: ${listStyle};">`);
                    currentListType = listType;
                }
                
                result.push('<li>' + processInlineMarkdown(listContent) + '</li>');
                continue;
            }
            
            // Non-list line - close any open list
            if (inList) {
                result.push('</ul>');
                inList = false;
                currentListType = null;
            }
            
            // Process regular lines
            if (line.trim()) {
                let processedLine = line.trim();

                if (processedLine.startsWith('> ')) {
                    processedLine = '<blockquote>' + processInlineMarkdown(processedLine.substring(2)) + '</blockquote>';
                } else if (processedLine.startsWith('# ')) {
                    processedLine = '<h1>' + processInlineMarkdown(processedLine.substring(2)) + '</h1>';
                } else if (processedLine.startsWith('## ')) {
                    processedLine = '<h2>' + processInlineMarkdown(processedLine.substring(3)) + '</h2>';
                } else if (processedLine.startsWith('### ')) {
                    processedLine = '<h3>' + processInlineMarkdown(processedLine.substring(4)) + '</h3>';
                } else if (processedLine.startsWith('#### ')) {
                    processedLine = '<h4>' + processInlineMarkdown(processedLine.substring(5)) + '</h4>';
                } else if (processedLine.startsWith('##### ')) {
                    processedLine = '<h5>' + processInlineMarkdown(processedLine.substring(6)) + '</h5>';
                } else if (processedLine.startsWith('###### ')) {
                    processedLine = '<h6>' + processInlineMarkdown(processedLine.substring(7)) + '</h6>';
                } else if (processedLine === '---') {
                    processedLine = '<hr>';
                } else {
                    processedLine = '<p>' + processInlineMarkdown(processedLine) + '</p>';
                }
                result.push(processedLine);
            }
        }

        if (inList) result.push('</ul>');
        return result.join('\n');
    }

    // Video control functions
    window.togglePlay = function(button) {
        const video = button.closest('.markdown-video-container').querySelector('.markdown-video');
        if (video.paused) {
            video.play();
            button.textContent = 'Pause';
        } else {
            video.pause();
            button.textContent = 'Play';
        }
    };

    window.setVolume = function(slider) {
        const video = slider.closest('.markdown-video-container').querySelector('.markdown-video');
        video.volume = slider.value;
    };

    // Universal Markdown loader function - works with any platform's raw URL
    window.loadMarkdownFromUrl = function(markdownUrl) {
        const output = document.getElementById('markdown-output');
        
        if (!output) {
            console.error('markdown-output element not found');
            return Promise.reject('markdown-output element not found');
        }
        
        output.innerHTML = '<p style="text-align: center; color: #999;">Loading document...</p>';
        
        return fetch(markdownUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(markdownText => {
                output.innerHTML = parseMarkdown(markdownText);
                return true;
            })
            .catch(error => {
                console.error('Error loading Markdown:', error);
                output.innerHTML = `
                    <div style="text-align: center; color: #d63031;">
                        <p>Failed to load document</p>
                        <p><small>Error: ${error.message}</small></p>
                        <p><a href="${markdownUrl}" target="_blank" rel="noopener noreferrer" style="color: #7393B3;">
                            Try opening the raw file directly
                        </a></p>
                    </div>
                `;
                throw error; // Re-throw for failover system
            });
    };

    // Backward compatibility alias
    window.loadMarkdownFromGitHub = window.loadMarkdownFromUrl;

    // Export parseMarkdown
    window.parseMarkdown = parseMarkdown;
})();