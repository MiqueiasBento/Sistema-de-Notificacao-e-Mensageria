package https.miqueiasbento.github.io.producer.tickets;

import https.miqueiasbento.github.io.producer.tickets.dto.TicketRequestDTO;
import https.miqueiasbento.github.io.producer.tickets.dto.TicketResponseDTO;
import https.miqueiasbento.github.io.producer.tickets.dto.UpdateTicketStatusDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicket(@RequestBody @Valid TicketRequestDTO data) {
        TicketResponseDTO newTicket = ticketService.createTicket(data);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newTicket.id()).toUri();
        return ResponseEntity.created(uri).body(newTicket);
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> listTickets() {
        return ResponseEntity.ok(ticketService.listTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicket(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicket(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TicketResponseDTO> updateStatus(@PathVariable Long id,
            @RequestBody @Valid UpdateTicketStatusDTO data) {
        return ResponseEntity.ok(ticketService.updateStatus(id, data));
    }
}
