package https.miqueiasbento.github.io.producer.tickets;

import https.miqueiasbento.github.io.producer.tickets.dto.TicketResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TicketMapper {

    @Mapping(target = "userName", source = "user.name")
    TicketResponseDTO toDTO(Ticket ticket);
}
