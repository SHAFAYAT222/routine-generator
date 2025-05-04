const sheetId = '1HhWuABpU5OIWWiL2sI6aM8GLjCP30q0wlI2lIAQ95co';
const sheetUrl = `https://opensheet.elk.sh/${sheetId}/Sheet1`;

async function getRoutine() {
  const id = document.getElementById('studentId').value.trim();
  const resultDiv = document.getElementById('routineResult');
  resultDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(sheetUrl);
    const data = await res.json();
    const userRoutine = data.filter(row => row.ID === id);

    if (userRoutine.length === 0) {
      resultDiv.innerHTML = "No routine found for this ID.";
      return;
    }

    let html = "<table><tr><th>Day</th><th>Time</th><th>Course</th><th>Room</th></tr>";
    userRoutine.forEach(row => {
      html += `<tr><td>${row.Day}</td><td>${row.Time}</td><td>${row.Course}</td><td>${row.Room}</td></tr>`;
    });
    html += "</table>";
    resultDiv.innerHTML = html;

  } catch (error) {
    resultDiv.innerHTML = "Error loading data.";
    console.error(error);
  }
}