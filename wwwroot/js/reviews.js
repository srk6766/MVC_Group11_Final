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
        listItem.classList.add('media', 'mb-4');

        const reviewContent = document.createElement('div');
        reviewContent.classList.add('media-body', 'ml-3');

        const reviewHeader = document.createElement('h5');
        reviewHeader.classList.add('mt-0', 'mb-1');
        reviewHeader.textContent = review.userName;

        const reviewDetails = document.createElement('p');
        reviewDetails.classList.add('mb-1');
        reviewDetails.textContent = `(${review.state}, ${review.place}): ${review.reviewText}`;

        const reviewRating = document.createElement('div');
        reviewRating.classList.add('mb-1');
        for (let i = 0; i < review.rating; i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            reviewRating.appendChild(star);
        }
        for (let i = review.rating; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = '☆';
            reviewRating.appendChild(star);
        }

        reviewContent.appendChild(reviewHeader);
        reviewContent.appendChild(reviewDetails);
        reviewContent.appendChild(reviewRating);

        listItem.appendChild(reviewContent);

        // Add edit and delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'mr-2');
        editButton.onclick = function () {
            editReview(review.id);
        };
        listItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.onclick = function () {
            deleteReview(review.id);
        };
        listItem.appendChild(deleteButton);

        reviewsList.appendChild(listItem);
    });
}

// Function to edit a review
function editReview(id) {
    const reviewIndex = reviews.findIndex(review => review.id === id);
    if (reviewIndex !== -1) {
        const updatedName = prompt('Enter updated name:', reviews[reviewIndex].userName);
        const updatedReview = prompt('Enter updated review:', reviews[reviewIndex].reviewText);
        const updatedRating = prompt('Enter updated rating (1-5):', reviews[reviewIndex].rating);

        if (updatedName && updatedReview && updatedRating) {
            reviews[reviewIndex].userName = updatedName;
            reviews[reviewIndex].reviewText = updatedReview;
            reviews[reviewIndex].rating = updatedRating;
            updateReviewList();
        }
    }
}

// Function to delete a review
function deleteReview(id) {
    const reviewIndex = reviews.findIndex(review => review.id === id);
    if (reviewIndex !== -1) {
        reviews.splice(reviewIndex, 1);
        updateReviewList();
    }
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById('userName').value = '';
    document.getElementById('stateSelect').value = '';
    document.getElementById('placeSelect').value = '';
    document.getElementById('userReview').value = '';
    document.getElementById('starRating').value = '';
}
