/* eslint-disable */

// Function to copy code from a button element
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const codeElement = codeBlock.querySelector('code');
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showNotification('Failed to copy code', true);
    });
}

// Function to download code from a button element
function downloadCode(button, filename) {
    const codeBlock = button.closest('.code-block');
    const codeElement = codeBlock.querySelector('code');
    const code = codeElement.textContent;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
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
    const codeBlocks = document.querySelectorAll('.code-block');
    let allCode = '';
    
    codeBlocks.forEach(block => {
        const title = block.querySelector('.code-title').textContent;
        const code = block.querySelector('code').textContent;
        allCode += `# ${title}\n${code}\n\n`;
    });
    
    navigator.clipboard.writeText(allCode).then(() => {
        showNotification('All code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showNotification('Failed to copy code', true);
    });
}

// Function to download all code
function downloadAllCode() {
    const codeBlocks = document.querySelectorAll('.code-block');
    let allCode = '';
    
    codeBlocks.forEach(block => {
        const title = block.querySelector('.code-title').textContent;
        const code = block.querySelector('code').textContent;
        allCode += `# ${title}\n${code}\n\n`;
    });
    
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
    // Add event listeners for global buttons
    document.getElementById('copyAllBtn').addEventListener('click', copyAllCode);
    document.getElementById('downloadAllBtn').addEventListener('click', downloadAllCode);
});
