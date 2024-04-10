(function() {
    // Styles
    const styles = `
        .events-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
        }
        .event-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            width: 220px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .event-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        .event-image-link {
            display: block;
            text-decoration: none;
        }
        .event-details {
            padding: 15px;
            background: #fff;
        }
        .event-details h3 {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        .event-details p {
            font-size: 0.9rem;
            color: #555;
            margin-bottom: 5px;
        }
    `;
    // Inject styles
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Script to load events
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.createElement('div');
        container.classList.add('events-container');
        document.body.appendChild(container); // Append to the body or a specific ID
        
        fetch('https://earlhaig.github.io/Global%20Promotions/Website%20Events/filteredEventsWithVenueDetails.json')
        .then(response => response.json())
        .then(events => {
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-card');
                
                const eventDate = new Date(event.start);
                const readableDate = eventDate.toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit'
                });

                eventElement.innerHTML = `
                    <a href="${event.url}" target="_blank" class="event-image-link">
                        <div class="event-image">
                            <img src="${event.logoUrl}" alt="${event.name}">
                        </div>
                    </a>
                    <div class="event-details">
                        <h3>${event.name}</h3>
                        <p><strong>Venue:</strong> ${event.venueName}</p>
                        <p><strong>Address:</strong> ${event.venueAddress}</p>
                        <p>${readableDate}</p>
                    </div>
                `;
                container.appendChild(eventElement);
            });
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            container.innerHTML = '<p>Failed to load events.</p>';
        });
    });
})();
