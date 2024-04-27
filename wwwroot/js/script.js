document.addEventListener('DOMContentLoaded', function () {
    var stateSelect = document.getElementById("stateSelect");

    // Populate state dropdown from the famousPlaces array
    famousPlaces.forEach(function (place) {
        var option = document.createElement("option");
        option.value = place.state;
        option.textContent = place.state;
        stateSelect.appendChild(option);
    });

    // Attach an event listener to the search button
    document.getElementById('searchButton').addEventListener('click', function () {
        var selectedState = stateSelect.value;
        displayPlaces(selectedState);
    });

    // Function to display famous places for the selected state
    function displayPlaces(state) {
        var stateInfo = famousPlaces.find(place => place.state.toLowerCase() === state.toLowerCase());

        if (stateInfo) {
            document.getElementById("pageTitle").textContent = "Famous Places in " + stateInfo.state;
            document.getElementById("stateImage").src = stateInfo.image;
            var placesList = document.getElementById("placesList");
            placesList.innerHTML = "";

            // Populate the places list dynamically based on selected state
            stateInfo.places.forEach(function (place) {
                var placeCard = document.createElement("div");
                placeCard.className = "col-md-4 mb-4";
                placeCard.innerHTML = `
                    <div class="card">
                        <img class="card-img-top" src="${place.image}" alt="${place.name}">
                        <div class="card-body">
                            <h5 class="card-title">${place.name}</h5>
                            <p class="card-text">${place.description}</p>
                        </div>
                    </div>`;
                placesList.appendChild(placeCard);
            });

            // Show the state information section if hidden
            document.getElementById("stateInfo").style.display = "block";
        } else {
            console.error("No data found for the selected state.");
        }
    }
});






// Add event listener for the reviews button to navigate to reviews page
var reviewsButton = document.getElementById("reviewsButton");
reviewsButton.addEventListener("click", function() {
    window.location.href = "reviews.html";
});

