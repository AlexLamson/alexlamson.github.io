const refreshInterval = 60_000;
const walkToBusStopInMinutes = 15;
const display = document.getElementById('times-display');

function showUnavailable() {
    display.textContent = 'Departure times are currently unavailable.';
}

function renderDepartures(data) {
    const directions = data?.[0]?.RouteDirections;
    if (!Array.isArray(directions) || directions.length === 0) {
        display.textContent = 'No upcoming departures.';
        return;
    }
    if (typeof moment !== 'function') {
        showUnavailable();
        return;
    }

    const now = moment();
    const serviceDayStart = now.clone().startOf('day').hour(4);
    if (now.hour() <= 4) {
        serviceDayStart.subtract(1, 'day');
    }
    const hourAdjustment = Number(serviceDayStart.isDST()) - Number(now.isDST());
    const nowInMinutes = (now.hour() + hourAdjustment) * 60 + now.minute();
    const table = document.createElement('table');
    const headings = table.createTHead().insertRow();
    for (const label of ['Punctuality', 'Departure time']) {
        const heading = document.createElement('th');
        heading.scope = 'col';
        heading.textContent = label;
        headings.appendChild(heading);
    }
    const rows = table.createTBody();

    for (const direction of directions) {
        const departures = direction?.Departures;
        if (!Array.isArray(departures)) {
            continue;
        }
        for (const departure of departures) {
            if (typeof departure?.EDT !== 'string' || !departure.EDT.trim()) {
                continue;
            }
            const time = moment(departure.EDT);
            if (!time.isValid()) {
                continue;
            }
            const nextDayMinutes = now.isSame(time, 'day') ? 0 : 24 * 60;
            const interval = time.hour() * 60 + time.minute() + nextDayMinutes
                - nowInMinutes - walkToBusStopInMinutes;
            if (interval < 0) {
                continue;
            }
            const row = rows.insertRow();
            row.insertCell().textContent = 'TO DO';
            const cell = row.insertCell();
            cell.className = 'text-right';
            cell.textContent = formatDeparture(interval);
        }
    }
    if (rows.rows.length > 0) {
        display.replaceChildren(table);
    } else {
        display.textContent = 'No upcoming departures.';
    }
}

function formatDeparture(minutes) {
    if (minutes === 0) {
        return 'Now';
    }
    if (minutes < 60) {
        return `${minutes} min`;
    }
    return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
}

function updateTimes() {
    $.ajax({
        url: 'https://bustracker.pvta.com/InfoPoint/rest/StopDepartures/Get/32',
        dataType: 'json',
        timeout: 1000,
        success: renderDepartures,
        error: showUnavailable,
    });
}

const today = new Date();
const specialDay = `${today.getMonth() + 1}-${today.getDate()}`;
document.getElementById('specialDay').textContent = national_days[specialDay] ?? '';

updateTimes();
setInterval(updateTimes, refreshInterval);
