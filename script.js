// Get the container where data will be displayed
const container = document.getElementById("data-container");

// Iterate through the JSON data and display it
data.forEach(item => {
    const row = document.createElement("div");
    row.innerHTML = `
        <p><strong>Лацінская назва:</strong> ${item["Лацінская назва"]}</p>
        <p><strong>Руская назва:</strong> ${item["Руская назва"]}</p>
        <p><strong>Беларуская назва:</strong> ${item["Беларуская назва"]}</p>
        <hr>
    `;
    container.appendChild(row);
});
