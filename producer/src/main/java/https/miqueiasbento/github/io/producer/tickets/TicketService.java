package https.miqueiasbento.github.io.producer.tickets;

import https.miqueiasbento.github.io.producer.tickets.dto.TicketRequestDTO;
import https.miqueiasbento.github.io.producer.tickets.dto.TicketResponseDTO;
import https.miqueiasbento.github.io.producer.tickets.dto.UpdateTicketStatusDTO;
import https.miqueiasbento.github.io.producer.event.publisher.EventPublisher;
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
    private final EventPublisher eventPublisher;

    @Transactional
    public TicketResponseDTO createTicket(TicketRequestDTO data) {
        var user = userRepository.findByEmail(data.email())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setDescription(data.description());
        ticket.setType(data.type());
        ticket.setStatus(StatusTicket.PENDENTE);
        ticket.setTitle(user.getName() + " -> Solicitação de suporte do tipo: " + data.type().getValue());
        ticket.setCreateAt(LocalDateTime.now());

        ticketRepository.save(ticket);

        eventPublisher.publishTicketCreated(ticket);

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

        StatusTicket oldStatus = ticket.getStatus();
        ticket.setStatus(data.status());
        ticketRepository.save(ticket);

        eventPublisher.publishTicketStatusChanged(ticket, oldStatus, data.status());

        if (data.status() == StatusTicket.RESOLVIDO) {
            eventPublisher.publishTicketClosed(ticket);
        }

        return ticketMapper.toDTO(ticket);
    }

    @Transactional
    public TicketResponseDTO assignAgent(Long id, String agentEmail) {
        var ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + id));

        var agent = userRepository.findByEmail(agentEmail)
                .orElseThrow(() -> new UserNotFoundException("Agent not found"));

        ticket.setAgent(agent);
        ticketRepository.save(ticket);

        eventPublisher.publishTicketAssigned(ticket);

        return ticketMapper.toDTO(ticket);
    }
}
