class Ticket {
    destination: string;
    price: number;
    status: string;
  
    constructor(destination: string, price: number, status: string) {
      this.destination = destination;
      this.price = price;
      this.status = status;
    }
  }
  
  function manageTickets(tickets: string[], sortingCriteria: string): Ticket[] {
    const parsedTickets: Ticket[] = tickets.map((ticketStr) => {
      const [destination, priceStr, status] = ticketStr.split('|');
      const price = Number(priceStr);
      return new Ticket(destination, price, status);
    });
  
    switch (sortingCriteria) {
      case 'destination':
        parsedTickets.sort((a, b) => a.destination.localeCompare(b.destination));
        break;
      case 'price':
        parsedTickets.sort((a, b) => a.price - b.price);
        break;
      case 'status':
        parsedTickets.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
  
    return parsedTickets; // Return the sorted array of tickets
  }
  
  const sortedTickets = manageTickets(
    [
      'Philadelphia|94.20|available',
      'New York City|95.99|available',
      'New York City|95.99|sold',
      'Boston|126.20|departed',
    ],
    'destination'
  );
  
  console.log(sortedTickets);
  