const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Update total price and count of selected seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem(
    "selectedSeatsIndex",
    JSON.stringify(selectedSeatsIndex)
  );

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem("selectedSeatsIndex")
  );

  if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = parseInt(e.target.value);
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, ticketPrice);
});

// Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected"); // enable click and unclick actions
  }
  updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();
