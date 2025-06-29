let userData = {
  name: "", age: "", symptoms: [], contact: "", date: "", time: ""
};

function updateProgress(step) {
  const map = { page1: "10%", page2: "30%", page3: "60%", page4: "85%", page5: "100%" };
  document.getElementById("progress").style.width = map[step];
}
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  updateProgress(id);
}
window.onload = () => showPage("page1");

function goToPage2() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  if (!name || !age) return alert("Please enter name and age");
  userData.name = name; userData.age = age;
  showPage("page2");
}

function goToPage3() {
  const sliders = document.querySelectorAll(".slider");
  userData.symptoms = [];
  sliders.forEach(slider => {
    const value = parseInt(slider.value);
    if (value > 0) {
      userData.symptoms.push({ name: slider.dataset.symptom, severity: value });
    }
  });
  if (userData.symptoms.length === 0) return alert("Select at least one symptom");

  const suggestions = {
    Fever: "Drink fluids, rest, take paracetamol.",
    Cough: "Warm drinks, avoid cold, use cough syrup.",
    Fatigue: "Take rest, stay hydrated, eat well.",
    Headache: "Avoid screen, take pain reliever.",
    "Sore Throat": "Gargle salt water, drink warm liquids.",
    "Chest Pain": "Avoid exertion, seek medical advice.",
    Rash: "Avoid scratching, apply skin cream."
  };
  const suggestionList = userData.symptoms.map(s => {
    const tip = suggestions[s.name] || "Consult a doctor.";
    return `<li><strong>${s.name}</strong> (Severity ${s.severity}/10): ${tip}</li>`;
  }).join("");
  document.getElementById("suggestions").innerHTML = `<ul>${suggestionList}</ul>`;
  showPage("page3");
}

function goToPage4() { showPage("page4"); }

function goToPage5() {
  const contact = document.getElementById("contact").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  if (!contact || !date || !time) return alert("Fill all appointment details");
  userData.contact = contact; userData.date = date; userData.time = time;
  document.getElementById("finalName").innerText = userData.name;
  document.getElementById("finalDate").innerText = userData.date;
  document.getElementById("finalTime").innerText = userData.time;
  showPage("page5");
}

function startVoiceInput(fieldId) {
  if (!('webkitSpeechRecognition' in window)) return alert("Speech not supported.");
  const recog = new webkitSpeechRecognition();
  recog.lang = "en-US";
  recog.onresult = e => {
    document.getElementById(fieldId).value = e.results[0][0].transcript;
  };
  recog.start();
}
