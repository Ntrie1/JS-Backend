var Ticket = /** @class */ (function () {
    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
    return Ticket;
}());
function manageTickets(tickets, sortingCriteria) {
    var parsedTickets = tickets.map(function (ticketStr) {
        var _a = ticketStr.split('|'), destination = _a[0], priceStr = _a[1], status = _a[2];
        var price = Number(priceStr);
        return new Ticket(destination, price, status);
    });
    switch (sortingCriteria) {
        case 'destination':
            parsedTickets.sort(function (a, b) { return a.destination.localeCompare(b.destination); });
            break;
        case 'price':
            parsedTickets.sort(function (a, b) { return a.price - b.price; });
            break;
        case 'status':
            parsedTickets.sort(function (a, b) { return a.status.localeCompare(b.status); });
            break;
        default:
            break;
    }
    return parsedTickets;
}
var sortedTickets = manageTickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'destination');
console.log(sortedTickets);
