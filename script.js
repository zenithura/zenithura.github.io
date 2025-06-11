/* eslint-disable */

// Function to create a code block element
function createCodeBlock(example) {
    const codeBlock = document.createElement('div');
    codeBlock.className = 'code-block';
    
    const header = document.createElement('div');
    header.className = 'code-header';
    
    const title = document.createElement('div');
    title.className = 'code-title';
    title.textContent = example.title;
    
    const actions = document.createElement('div');
    actions.className = 'code-actions';
    
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.title = 'Copy Code';
    copyBtn.onclick = () => copyCode(example.code);
    
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
    downloadBtn.title = 'Download Code';
    downloadBtn.onclick = () => downloadCode(example.code, example.title);
    
    actions.appendChild(copyBtn);
    actions.appendChild(downloadBtn);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = example.code;
    
    pre.appendChild(code);
    codeBlock.appendChild(header);
    codeBlock.appendChild(pre);
    
    return codeBlock;
}

// Function to copy code to clipboard
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showNotification('Failed to copy code', true);
    });
}

// Function to download code as a file
function downloadCode(code, title) {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to show notification
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to copy all code
function copyAllCode() {
    const allCode = codeExamples.map(example => 
        `# ${example.title}\n${example.code}\n\n`
    ).join('');
    
    copyCode(allCode);
}

// Function to download all code
function downloadAllCode() {
    const allCode = codeExamples.map(example => 
        `# ${example.title}\n${example.code}\n\n`
    ).join('');
    
    const blob = new Blob([allCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python-examples.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.code-container');
    
    // Add all code blocks
    codeExamples.forEach(example => {
        container.appendChild(createCodeBlock(example));
    });
    
    // Add event listeners for global buttons
    document.getElementById('copyAllBtn').addEventListener('click', copyAllCode);
    document.getElementById('downloadAllBtn').addEventListener('click', downloadAllCode);
}); 