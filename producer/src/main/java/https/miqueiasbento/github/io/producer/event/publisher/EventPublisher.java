package https.miqueiasbento.github.io.producer.event.publisher;

import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import https.miqueiasbento.github.io.producer.tickets.Ticket;

public interface EventPublisher {
    void publishTicketCreated(Ticket ticket);

    void publishTicketUpdated(Ticket ticket);

    void publishTicketStatusChanged(Ticket ticket, StatusTicket oldStatus, StatusTicket newStatus);

    void publishTicketAssigned(Ticket ticket);

    void publishTicketClosed(Ticket ticket);
}
