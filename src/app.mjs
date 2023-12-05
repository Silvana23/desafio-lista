import {getItem, setItem} from './util/storage.mjs';
import message from './util/message.mjs';

import {isLoggedIn, logOut} from './core/auth.mjs';

main();

function main() {
    if (!isLoggedIn()) {
        window.history.pushState({}, null, "./index.html");
        location.reload();
        return;
    }

    const users = getItem('users');
    const user = getItem('user');

    const nameTemplate = document.getElementById('ts-user-name');
    nameTemplate.innerText = user.name;

    const app = document.getElementById('app');

    mountTaskForm(user, app);
    mountTaskViewer(app);
}

function mountTaskForm(app) {
    const taskName = document.getElementById('taskName');
    const taskStartDate = document.getElementById('taskStartDate');
    const taskEndDate = document.getElementById('taskEndDate');
    const taskStartTime = document.getElementById('taskStartTime');
    const taskEndTime = document.getElementById('taskEndTime');
    const taskContent = document.getElementById('taskContent');

    const createTaskButton = document.getElementById('taskCreateButton');
    const modifyTaskButton = document.getElementById('taskModifyButton');
    const deleteTaskButton = document.getElementById('taskDeleteButton');
    const finishTaskButton = document.getElementById('taskFinishButton');
    const cancelTaskButton = document.getElementById('taskCancelButton');

    createTaskButton.addEventListener('click', (ev) => {
        ev.preventDefault();

        let users = getItem('users');
        const user = getItem('user');

        const task = {
            id: crypto.randomUUID(),
            name: taskName.value,
            startDate: taskStartDate.value,
            endDate: taskEndDate.value,
            startTime: taskStartTime.value,
            endTime: taskEndTime.value,
            content: taskContent.content
        };

        user.tasks.push(task);

        users = users.filter(usr => usr.email !== user.email);
        users.push(user);

        setItem('users', users);
        setItem('user', user);

        location.reload();
    });

    modifyTaskButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        
    })
}

function mountTaskViewer(app) {
    const user = getItem('user');

    const taskViewer = document.getElementById('ts-task-viewer');

    user.tasks.forEach((task, idx) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('ts-task-viewer-header', idx % 2 === 0 ? 'ts-task-even' : 'ts-task-odd');

        const titleP = document.createElement('p');
        titleP.innerText = task.name;

        const startP = document.createElement('p');
        startP.innerText = `${task.startDate} at ${task.startTime}`;

        const endP = document.createElement('p');
        endP.innerText = `${task.endDate} at ${task.endTime}`;

        const statusP = document.createElement('p');
        const expireTimestamp = new Date(`${task.endDate} ${task.endTime}`).getTime();
        const currentTimestamp = new Date().getTime();

        if (expireTimestamp < currentTimestamp) {
            statusP.innerText = 'Late!';
        } else {
            statusP.innerText = 'On time!';
        }

        const modifyBtn = document.createElement('button');
        modifyBtn.classList.add('ts-app-button');
        modifyBtn.innerText = 'Modify';

        taskDiv.appendChild(titleP);
        taskDiv.appendChild(startP);
        taskDiv.appendChild(endP);
        taskDiv.appendChild(statusP);
        taskDiv.appendChild(modifyBtn);

        taskViewer.appendChild(taskDiv);
    });
}