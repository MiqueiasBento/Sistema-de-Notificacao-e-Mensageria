package https.miqueiasbento.github.io.producer.tickets;

import https.miqueiasbento.github.io.producer.tickets.dto.TicketRequestDTO;
import https.miqueiasbento.github.io.producer.tickets.dto.TicketResponseDTO;
import https.miqueiasbento.github.io.producer.tickets.dto.UpdateTicketStatusDTO;
import https.miqueiasbento.github.io.producer.tickets.exception.TicketNotFoundException;
import https.miqueiasbento.github.io.producer.users.UserRepository;
import https.miqueiasbento.github.io.producer.share.globalExceptions.UserNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketMapper ticketMapper;

    @Transactional
    public TicketResponseDTO createTicket(TicketRequestDTO data) {
        var user = userRepository.findByEmail(data.email())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setDescription(data.description());
        ticket.setType(data.type());
        ticket.setStatus(StatusTicket.PENDENTE);
        ticket.setTitle(user.getName() + " -> Solicitaão de suporte do tipo: " + data.type().getValue());
        ticket.setCreateAt(LocalDateTime.now());

        ticketRepository.save(ticket);

        return ticketMapper.toDTO(ticket);
    }

    public List<TicketResponseDTO> listTickets() {
        return ticketRepository.findAll().stream()
                .map(ticketMapper::toDTO)
                .toList();
    }

    public TicketResponseDTO getTicket(Long id) {
        var ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + id));
        return ticketMapper.toDTO(ticket);
    }

    @Transactional
    public TicketResponseDTO updateStatus(Long id, UpdateTicketStatusDTO data) {
        var ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + id));

        ticket.setStatus(data.status());
        ticketRepository.save(ticket);

        return ticketMapper.toDTO(ticket);
    }
}
