// Элементы страницы
const noteArea = document.getElementById('note-area');
const savedNotes = document.getElementById('saved-notes');
const saveButton = document.getElementById('save-button');

// Загрузка сохраненных заметок при загрузке страницы
window.addEventListener('load', () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteText => addNoteToPage(noteText));
});

// Добавление заметки на страницу и в localStorage
saveButton.addEventListener('click', () => {
    const noteText = noteArea.value.trim();
    if (!noteText) {
        alert('Заметка не может быть пустой!');
        return;
    }

    addNoteToPage(noteText);
    saveNoteToLocalStorage(noteText);
    noteArea.value = '';
});

// Функция добавления заметки на страницу
function addNoteToPage(noteText) {
    const note = document.createElement('div');
    note.textContent = noteText;
    note.className = 'note';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete-button';

    // Удаление заметки из localStorage и страницы
    deleteButton.addEventListener('click', () => {
        removeNoteFromLocalStorage(noteText);
        note.remove();
    });

    note.appendChild(deleteButton);
    savedNotes.appendChild(note);
}

// Функция сохранения заметки в localStorage
function saveNoteToLocalStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Функция удаления заметки из localStorage
function removeNoteFromLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}