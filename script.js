// ========== 词句库（你可以随意增删改） ==========
const replies = [
    "嗯，有道理！",
    "这个想法挺有意思的。",
    "哈哈，你说得对。",
    "让我想想……是的！",
    "不太确定，但值得一试。",
    "666，高手！",
    "别急，慢慢来。",
    "我支持你！",
    "今天天气真好啊～",
    "你这个问题问得好！"
];

// ========== 保存和加载聊天记录 ==========
function saveMessages(messages) {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
    const data = localStorage.getItem('chatMessages');
    return data ? JSON.parse(data) : [];
}

// ========== 显示消息 ==========
function displayMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // 自动滚到底部
}

// ========== 加载历史消息 ==========
function loadHistory() {
    const messages = loadMessages();
    messages.forEach(msg => {
        displayMessage(msg.text, msg.sender);
    });
}

// ========== 发送消息 ==========
function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    // 1. 显示用户消息
    displayMessage(text, 'user');
    // 2. 保存到 localStorage
    const messages = loadMessages();
    messages.push({ text, sender: 'user' });
    saveMessages(messages);

    // 3. 随机回复
    const botReply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => {
        displayMessage(botReply, 'bot');
        const messages2 = loadMessages();
        messages2.push({ text: botReply, sender: 'bot' });
        saveMessages(messages2);
    }, 500); // 模拟半秒延迟

    input.value = '';
}

// ========== 页面加载时显示历史 ==========
window.onload = loadHistory;

// ========== 回车发送 ==========
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});