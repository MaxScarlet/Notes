/** =============================================================== Max ===
 * Utilities for test and debug
*/

/**
 * Generate random note values
 */
function randomNote() {
    const ttlBox = document.getElementById("memoTitle");
    const descBox = document.getElementById("memoContent");
    const dateBox = document.getElementById("dateBox");

    ttlBox.value = generateRndText(15);
    descBox.value = generateRndText();
    let randomDate = new Date();
    randomDate.setDate(randomDate.getDate() + rndInt(7, 1));
    dateBox.value = dateStr(randomDate);
}

function generateRndText(textLength = 30) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    const length = Math.floor(Math.random() * textLength) + 1;
    let lineBreak = 0;
    let wordBreak = 0;
    // Loop through the desired length and randomly select characters from the characters string
    for (let i = 0; i < length; i++) {
        const randomIndex = rndInt(characters.length);
        text += characters[randomIndex];
        lineBreak = Math.floor(Math.random() * 20) + 10; // line break every 10-20 chars
        if (i % lineBreak == 0 && i != 0) text += "\n";
        wordBreak = Math.floor(Math.random() * 10) + 3; // word break every 3-10 chars
        if (i % wordBreak == 0 && i != 0) text += " ";
    }
    return text;
}

/**
 * Clears all notes from storage
 */
function clearNoteStorage() {
    localStorage.removeItem("notes");
    renderNotes();
}

/**
 *
 * @param {number} bound
 * @param {number} shift
 * @returns returns a random integer between 0 and bound + shift
 */
function rndInt(bound, shift = 0) {
    return Math.floor(Math.random() * bound) + shift;
}
