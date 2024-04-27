let reviews = []; // Holds all reviews

// Dynamically update the places dropdown based on selected state
function updatePlacesDropdown() {
    let stateSelect = document.getElementById("stateSelect");
    let placeSelect = document.getElementById("placeSelect");
    if (!stateSelect || !placeSelect) return; // Ensure elements are there

    let selectedState = stateSelect.value;
    placeSelect.innerHTML = '<option value="">Select Famous Place</option>'; // Clear existing options and provide a default

    // Find the selected state's data
    let stateData = famousPlaces.find(place => place.state === selectedState);
    if (stateData && stateData.places) {
        stateData.places.forEach(function (place) {
            let option = document.createElement("option");
            option.value = place.name;
            option.textContent = place.name;
            placeSelect.appendChild(option);
        });
    } else {
        let defaultOption = document.createElement("option");
        defaultOption.textContent = "No places available";
        placeSelect.appendChild(defaultOption);
    }
}

// Handle review submission
function submitReview() {
    let userName = document.getElementById('userName').value;
    let state = document.getElementById('stateSelect').value;
    let place = document.getElementById('placeSelect').value;
    let reviewText = document.getElementById('userReview').value;
    let rating = document.getElementById('starRating').value;

    let review = {
        userName: userName,
        state: state,
        place: place,
        reviewText: reviewText,
        rating: rating,
        id: Date.now() // Simple ID generation
    };

    reviews.push(review); // Add the review to the array
    console.log('Review added:', review);
    updateReviewList(); // Update the list displayed
}

// Function to update the reviews list
function updateReviewList() {
    const reviewsList = document.getElementById('reviews');
    reviewsList.innerHTML = ''; // Clear current list
    reviews.forEach(function (review) {
        const listItem = document.createElement('li');
        listItem.textContent = `${review.userName} (${review.state}, ${review.place}): ${review.reviewText}`;
        reviewsList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var stateSelect = document.getElementById('stateSelect');
    if (stateSelect) {
        stateSelect.addEventListener('change', updatePlacesDropdown);
    }
    updatePlacesDropdown(); // Update on load in case there's a default state selected
});
