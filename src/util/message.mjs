export const Levels = {
    "INFO": 0,
    "WARN": 1,
    "ERROR": 2
};

const MESSAGE_ID = 'ts-message'

export default function (level, message, target) {
    const messageDiv =  document.createElement('div');
    messageDiv.classList.add('ts-message', `ts-message-${level}`);

    const messageP = document.createElement('p');
    messageP.innerText = message;

    messageDiv.appendChild(messageP);

    setTimeout(() => {
        messageDiv.classList.add('ts-message-hidden');
        setTimeout(() => target.removeChild(messageDiv), 750);
    }, 3000);

    target.appendChild(messageDiv);
}