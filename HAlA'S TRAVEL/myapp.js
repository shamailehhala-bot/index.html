let flights = [
    {
        id: 1,
        from: "Amman",
        to: "Dubai",
        departureDate: "2026-02-15",
        returnDate: "2026-02-20",
        price: 180,
        availableSeats: 12
    },
    {
        id: 2,
        from: "Cairo",
        to: "Istanbul",
        departureDate: "2026-03-01",
        returnDate: "2026-03-07",
        price: 220,
        availableSeats: 8
    }
];

let bookings = [
    {
        bookingId: 101,
        from: "Amman",
        to: "Dubai",
        tickets: 2,
        status: "confirmed"
    }
];

function showFlights(filteredFlights = flights) {
    const flightsList = document.getElementById("flightsList");
    flightsList.innerHTML = "";

    let topPrice = Math.min(...filteredFlights.map(f => f.price));

    filteredFlights.forEach(flight => {
        const li = document.createElement("li");
        li.classList.add("marquee-item");

        let text = `${flight.from} → ${flight.to} | Departure: ${flight.departureDate} | Price: $${flight.price}`;

        if (flight.price === topPrice) {
            li.style.background = "#dbeafe";
            li.style.border = "2px solid #2563eb";
            li.style.fontWeight = "bold";
            li.style.color = "#1e293b";
            text += " ⭐ Best Deal";
        }

        li.textContent = text;
        flightsList.appendChild(li);
    });
}

window.onload = () => showFlights();

function bookTicket() {
    const from = document.getElementById("from").value.toLowerCase();
    const to = document.getElementById("to").value.toLowerCase();
    const tickets = document.getElementById("tickets").value;
    const message = document.getElementById("message");

    let filteredFlights = flights.filter(flight =>
        flight.from.toLowerCase().includes(from) &&
        flight.to.toLowerCase().includes(to)
    );

    if (filteredFlights.length === 0) {
        message.textContent = "No flights found";
        message.style.color = "red";
    } else {
        message.textContent = `Found ${filteredFlights.length} flight(s)`;
        message.style.color = "green";
    }

    showFlights(filteredFlights);
}

function resetSearch() {
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("tickets").value = "";
    document.getElementById("message").textContent = "";
    showFlights();
}
