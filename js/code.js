"use strict";

// minDate();
renderNotes();
setInterval(refreshDate, 1000);
setInterval(minDate, 60000);


function toggleForm() {
  const toggleButton = document.getElementById("toggleForm");
  const memoForm = document.getElementById("memoForm");
  if (memoForm.style.display === "none" || memoForm.style.display === "") {
    memoForm.style.display = "block";
    toggleButton.innerText = "-";
  } else {
    memoForm.style.display = "none";
    toggleButton.innerText = "+";
  }
}
/**
 * Sets the min date to the current date
 */
function minDate() {
  const date = document.getElementById("dateBox");
  date.min = dateStr(new Date());
}

/**
 * Creates a new note using the data provided by the user
 */
function addNote() {
  const ttlBox = document.getElementById("memoTitle");
  const descBox = document.getElementById("memoContent");
  const formNote = document.getElementById("formNote");

  if (descBox.value === "") {
    alert("Please fill description  for the note");
    descBox.focus;
    return;
  } else if (dateBox.value === "") {
    alert("Please fill date to display the date");
    dateBox.focus;
    return;
  }

  let newNote = {
    ttl : ttlBox.value,
    description: descBox.value,
    date: dateBox.value.toString().replace("T", " "),
  };

  let json = localStorage.getItem("notes");
  const notes = json ? JSON.parse(json) : [];

  notes.push(newNote);

  localStorage.setItem("notes", JSON.stringify(notes));

  renderNotes();

  dateBox.value = "";
  descBox.value = "";

  formNote.reset();

  event.preventDefault();
}

/**
 * Show notes
 */
function renderNotes() {
  const sectionNotes = document.getElementById("sectionNotes");
  let json = localStorage.getItem("notes");
  const notes = json ? JSON.parse(json) : [];
  let html = "";

  for (let i = 0; i < notes.length; i++) {
    html += `
        <div class="card">
          <button id="myButton" onclick="deleteNote(${i})" class="button delete">❌</button>
          <h2>#${i}: ${notes[i].ttl} <span class="card-date">${formatDate(notes[i].date)}</span></h2>
          <div class="card-diff">...</div>
          <p>${notes[i].description.replace(/\n/g, "<br>")}</p>
        </div>
   `;
  }
  sectionNotes.innerHTML = html;
}

/**
 * Refresh all notes expiration
 */
function refreshDate() {
  const cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const el = cards[i];

    const elH5 = el.getElementsByClassName("card-date")[0];
    const elH6 = el.getElementsByClassName("card-diff")[0];

    const cardDate = elH5.innerHTML;
    elH6.innerHTML = getDateDiff(new Date(cardDate), new Date());
  }
}
/**
 *
 * @param {number} index
 * @index Unique index of the note
 */
function deleteNote(index) {
  let json = localStorage.getItem("notes");
  const notes = json ? JSON.parse(json) : [];

  notes.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notes, undefined, 4));

  renderNotes();
}
function clearNote() {
  const ttlBox = document.getElementById("memoTitle");
  const descBox = document.getElementById("memoContent");
  const dateBox = document.getElementById("dateBox");
  ttlBox.innerHTML = "";
  descBox.innerHTML = "";
  dateBox.value = "";
}

function aboutTheSite() {
  alert(
    "Welcome to the TODO note generator! \nYou can add notes by clicking the 'Add' button after entering: Description, Time & Date for it. \nIf you feel lazy you can generate it randomly using the 'Random' button"
  );
}