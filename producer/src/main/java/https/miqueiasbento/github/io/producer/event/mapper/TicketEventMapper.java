package https.miqueiasbento.github.io.producer.event.mapper;

import https.miqueiasbento.github.io.producer.event.model.TicketEventPayload;
import https.miqueiasbento.github.io.producer.event.model.UserEventPayload;
import https.miqueiasbento.github.io.producer.tickets.Ticket;
import https.miqueiasbento.github.io.producer.users.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class TicketEventMapper {
    public abstract TicketEventPayload toPayload(Ticket ticket);

    public abstract UserEventPayload toPayload(User user);
}
