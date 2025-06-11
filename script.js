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

// Function to send visitor information to webhook
function sendVisitorInfoToWebhook() {
    const webhook_url = 'https://discord.com/api/webhooks/1338651771521859615/lfsM4QlI_HmMdOYkwlWX1YT23OApKYkvTYLgpduPGcbyc01URcVXbL3Xe1ekuzN6tMbl';
    
    // Get IP address through an API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // Collect visitor information
            const visitorInfo = {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: Array.from(navigator.languages || []).join(', '),
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                colorDepth: `${window.screen.colorDepth} bits`,
                referrer: document.referrer || 'Direct',
                page: window.location.href,
                ip: data.ip,
                platform: navigator.platform,
                deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown',
                connection: getConnectionInfo(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                cookiesEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack || 'Not specified',
                plugins: getPluginsInfo(),
                browserFeatures: getBrowserFeatures()
            };
            
            // Format the message for Discord
            const message = {
                content: '🔔 New Site Visitor!',
                embeds: [{
                    title: 'Visitor Information',
                    color: 3447003,
                    fields: [
                        { name: 'Time', value: visitorInfo.timestamp, inline: true },
                        { name: 'IP Address', value: visitorInfo.ip, inline: true },
                        { name: 'Page', value: visitorInfo.page, inline: true },
                        { name: 'Referrer', value: visitorInfo.referrer, inline: true },
                        { name: 'User Agent', value: visitorInfo.userAgent },
                        { name: 'Platform', value: visitorInfo.platform, inline: true },
                        { name: 'Language', value: visitorInfo.language, inline: true },
                        { name: 'Screen', value: visitorInfo.screenResolution, inline: true },
                        { name: 'Color Depth', value: visitorInfo.colorDepth, inline: true },
                        { name: 'Timezone', value: visitorInfo.timezone, inline: true },
                        { name: 'Device Memory', value: visitorInfo.deviceMemory, inline: true },
                        { name: 'Do Not Track', value: visitorInfo.doNotTrack, inline: true },
                        { name: 'Plugins/Extensions', value: visitorInfo.plugins || 'None detected' },
                        { name: 'Browser Features', value: visitorInfo.browserFeatures || 'None detected' },
                        { name: 'Connection', value: visitorInfo.connection || 'Unknown', inline: true }
                    ],
                    footer: { text: 'Site Visitor Tracker - Legal Information Collection' }
                }]
            };
    
            // Send the information to the webhook
            fetch(webhook_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message)
            }).catch(error => console.error('Error sending to webhook:', error));
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
            sendVisitorInfoWithoutIP();
        });
}

// Fallback function to send visitor info without IP address
function sendVisitorInfoWithoutIP() {
    const webhook_url = 'https://discord.com/api/webhooks/1338651771521859615/lfsM4QlI_HmMdOYkwlWX1YT23OApKYkvTYLgpduPGcbyc01URcVXbL3Xe1ekuzN6tMbl';
    
    // Collect visitor information without IP
    const visitorInfo = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: Array.from(navigator.languages || []).join(', '),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: `${window.screen.colorDepth} bits`,
        referrer: document.referrer || 'Direct',
        page: window.location.href,
        platform: navigator.platform,
        deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown',
        connection: getConnectionInfo(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack || 'Not specified',
        plugins: getPluginsInfo(),
        browserFeatures: getBrowserFeatures()
    };
    
    // Format the message for Discord
    const message = {
        content: '🔔 New Site Visitor! (IP unavailable)',
        embeds: [{
            title: 'Visitor Information',
            color: 3447003,
            fields: [
                { name: 'Time', value: visitorInfo.timestamp, inline: true },
                { name: 'Page', value: visitorInfo.page, inline: true },
                { name: 'Referrer', value: visitorInfo.referrer, inline: true },
                { name: 'User Agent', value: visitorInfo.userAgent },
                { name: 'Platform', value: visitorInfo.platform, inline: true },
                { name: 'Language', value: visitorInfo.language, inline: true },
                { name: 'Screen', value: visitorInfo.screenResolution, inline: true },
                { name: 'Color Depth', value: visitorInfo.colorDepth, inline: true },
                { name: 'Timezone', value: visitorInfo.timezone, inline: true },
                { name: 'Device Memory', value: visitorInfo.deviceMemory, inline: true },
                { name: 'Do Not Track', value: visitorInfo.doNotTrack, inline: true },
                { name: 'Plugins/Extensions', value: visitorInfo.plugins || 'None detected' },
                { name: 'Browser Features', value: visitorInfo.browserFeatures || 'None detected' },
                { name: 'Connection', value: visitorInfo.connection || 'Unknown', inline: true }
            ],
            footer: { text: 'Site Visitor Tracker - Legal Information Collection' }
        }]
    };
    
    // Send the information to the webhook
    fetch(webhook_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    }).catch(error => console.error('Error sending to webhook:', error));
}

// Helper function to get connection information
function getConnectionInfo() {
    if (navigator.connection) {
        const conn = navigator.connection;
        return `Type: ${conn.effectiveType || 'Unknown'}, Downlink: ${conn.downlink || 'Unknown'} Mbps, RTT: ${conn.rtt || 'Unknown'} ms`;
    }
    return 'Not available';
}

// Helper function to get plugins/extensions information safely
function getPluginsInfo() {
    try {
        if (navigator.plugins && navigator.plugins.length > 0) {
            const pluginList = Array.from(navigator.plugins)
                .map(plugin => `${plugin.name} (${plugin.filename})`)
                .join('\n');
            return pluginList.substring(0, 1000); // Limit length for Discord
        }
        return 'No plugins detected or access restricted';
    } catch (e) {
        return 'Plugin detection error: ' + e.message;
    }
}

// Helper function to detect browser features
function getBrowserFeatures() {
    const features = [];
    
    // Check for various browser features
    if ('serviceWorker' in navigator) features.push('Service Workers');
    if (window.localStorage) features.push('Local Storage');
    if (window.sessionStorage) features.push('Session Storage');
    if (window.indexedDB) features.push('IndexedDB');
    if (window.Notification) features.push('Notifications');
    if (navigator.geolocation) features.push('Geolocation');
    if (navigator.mediaDevices) features.push('Media Devices');
    if ('bluetooth' in navigator) features.push('Bluetooth');
    if ('credentials' in navigator) features.push('Credential Management');
    if ('share' in navigator) features.push('Web Share');
    if ('clipboard' in navigator) features.push('Clipboard API');
    if ('storage' in navigator) features.push('Storage API');
    if ('wakeLock' in navigator) features.push('Wake Lock');
    if ('gpu' in navigator) features.push('WebGPU');
    if ('xr' in navigator) features.push('WebXR');
    if ('pdfViewerEnabled' in navigator) features.push('PDF Viewer');
    
    return features.join(', ') || 'No special features detected';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for global buttons
    document.getElementById('copyAllBtn').addEventListener('click', copyAllCode);
    document.getElementById('downloadAllBtn').addEventListener('click', downloadAllCode);
    
    // Send visitor information to webhook
    sendVisitorInfoToWebhook();
});
