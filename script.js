function getBirdName(latinName, dataArray) {
    const birdMatch = dataArray.find(bird => bird.sciName === latinName);
    return birdMatch ? birdMatch.comName : "Няма дадзеных";
}

function displayBirds(filteredBirds) {
    const allBirdsDiv = document.getElementById('all-birds');
    allBirdsDiv.innerHTML = '';

    if (filteredBirds.length === 0) {
        allBirdsDiv.innerHTML = "<p>Нічога не знойдзена</p>";
        return;
    }

    const ulElement = document.createElement('ul');
    ulElement.style.listStyle = 'none'; // Remove default bullet points
    ulElement.style.padding = '0'; // Remove default padding

    filteredBirds.forEach(bird => {
        const latinName = bird["Лацінская назва"];
        const englishName = getBirdName(latinName, ebirdsData);
        const polishName = getBirdName(latinName, ebirdsDataPl);
        const portugueseName = getBirdName(latinName, ebirdsDataPt);

        const liElement = document.createElement('li');
        liElement.style.marginBottom = '20px'; // Add some spacing between birds
        liElement.innerHTML = `
            <p><strong>Лацінская назва:</strong> ${latinName}</p>
            <p><strong>Беларуская назва:</strong> ${bird["Беларуская назва"]}</p>
            <p><strong>Англійская назва:</strong> ${englishName}</p>
            <p><strong>Партугальская назва:</strong> ${portugueseName}</p>
            <p><strong>Польская назва:</strong> ${polishName}</p>
            <p><strong>Руская назва:</strong> ${bird["Руская назва"]}</p>
            <hr>
        `;
        ulElement.appendChild(liElement);
    });
    allBirdsDiv.appendChild(ulElement);
}

function searchBirds() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();

    if (query === "") {
        displayBirds(birdsData);
        return;
    }

    const filteredBirds = birdsData.filter(bird => {
        const latinName = bird["Лацінская назва"];
        return bird["Беларуская назва"].toLowerCase().includes(query) ||
               bird["Руская назва"].toLowerCase().includes(query) ||
               latinName.toLowerCase().includes(query) ||
               getBirdName(latinName, ebirdsData).toLowerCase().includes(query) ||
               getBirdName(latinName, ebirdsDataPl).toLowerCase().includes(query) ||
               getBirdName(latinName, ebirdsDataPt).toLowerCase().includes(query);
    });

    displayBirds(filteredBirds);

    if (typeof gtag === "function") {
        gtag('event', 'search', {
            'event_label': query
        });
    }
}

displayBirds(birdsData);

document.getElementById('search-input').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchBirds();
    }
});

function loadGoogleAnalytics() {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-9BHYMS09HX";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-9BHYMS09HX');
}

function acceptCookies() {
    localStorage.setItem("cookie_consent", "accepted");
    document.getElementById("cookie-banner").style.display = "none";
    loadGoogleAnalytics();
}

function declineCookies() {
    localStorage.setItem("cookie_consent", "declined");
    document.getElementById("cookie-banner").style.display = "none";
}

window.onload = function() {
    var consent = localStorage.getItem("cookie_consent");

    if (consent === "accepted") {
        loadGoogleAnalytics();
    } else if (!consent) {
        document.getElementById("cookie-banner").style.display = "flex";
    }
};