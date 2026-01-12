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

    if (filteredFlights.length === 0) return;

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

function searchFlights(from, to) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const results = flights.filter(flight =>
                flight.from.toLowerCase().includes(from.toLowerCase()) &&
                flight.to.toLowerCase().includes(to.toLowerCase())
            );
            if (results.length > 0) {
                resolve(results);
            } else {
                reject("No flights found for your search");
            }
        }, 800); 
    });
}

function reserveTickets(flightId, tickets) {
    return new Promise((resolve, reject) => {
        const flight = flights.find(f => f.id === flightId);

        if (!flight) {
            reject("Flight not found");
        } else if (tickets > flight.availableSeats) {
            reject("Not enough seats available");
        } else {
            flight.availableSeats -= tickets;
            const bookingId = Math.floor(Math.random() * 1000) + 100;
            bookings.push({
                bookingId,
                from: flight.from,
                to: flight.to,
                tickets,
                status: "confirmed"
            });
            resolve(`Booking confirmed! ID: ${bookingId}`);
        }
    });
}

async function bookTicket() {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const tickets = Number(document.getElementById("tickets").value);
    const message = document.getElementById("message");

    message.textContent = "";
    message.style.color = "black";

    try {
        if (!from || !to || !tickets) throw "Please fill all search fields";

        const filteredFlights = await searchFlights(from, to);
        showFlights(filteredFlights);
        message.textContent = `Found ${filteredFlights.length} flight(s)`;

        const bestFlight = filteredFlights[0];
        const confirmation = await reserveTickets(bestFlight.id, tickets);

        message.textContent = confirmation;
        message.style.color = "green";

    } catch (error) {
        message.textContent = error;
        message.style.color = "red";
        showFlights([]);
    }
}

function resetSearch() {
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("tickets").value = "";
    const message = document.getElementById("message");
    message.textContent = "";
    message.style.color = "black";
    showFlights();
}

window.onload = () => showFlights();
