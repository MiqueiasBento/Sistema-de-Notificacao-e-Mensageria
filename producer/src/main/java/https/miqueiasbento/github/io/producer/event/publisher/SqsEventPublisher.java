package https.miqueiasbento.github.io.producer.event.publisher;

import https.miqueiasbento.github.io.producer.event.mapper.TicketEventMapper;
import https.miqueiasbento.github.io.producer.event.model.*;
import https.miqueiasbento.github.io.producer.tickets.StatusTicket;
import https.miqueiasbento.github.io.producer.tickets.Ticket;
import io.awspring.cloud.sqs.operations.SqsTemplate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SqsEventPublisher implements EventPublisher {

    @Value("${aws.queue.name:smn-queue}")
    private String queueName;

    @Value("${aws.queue.url}")
    private String queueUrl;

    private final SqsTemplate sqsTemplate;
    private final TicketEventMapper mapper;
//    private final ObjectMapper objectMapper;

    @Override
    public void publishTicketCreated(Ticket ticket) {
        TicketEventPayload payload = mapper.toPayload(ticket);
        TicketCreatedEvent event = new TicketCreatedEvent(
                UUID.randomUUID().toString(),
                Instant.now().toString(),
                payload
        );
        sendEvent(event);
    }

    @Override
    public void publishTicketUpdated(Ticket ticket) {
        TicketEventPayload payload = mapper.toPayload(ticket);
        TicketUpdatedEvent event = new TicketUpdatedEvent(
                UUID.randomUUID().toString(),
                Instant.now().toString(),
                payload
        );
        sendEvent(event);
    }

    @Override
    public void publishTicketStatusChanged(Ticket ticket, StatusTicket oldStatus, StatusTicket newStatus) {
        TicketEventPayload payload = mapper.toPayload(ticket);
        TicketStatusChangedEvent event = new TicketStatusChangedEvent(
                UUID.randomUUID().toString(),
                Instant.now().toString(),
                payload,
                oldStatus,
                newStatus
        );
        sendEvent(event);
    }

    @Override
    public void publishTicketAssigned(Ticket ticket) {
        TicketEventPayload payload = mapper.toPayload(ticket);
        TicketAssignedEvent event = new TicketAssignedEvent(
                UUID.randomUUID().toString(),
                Instant.now().toString(),
                payload,
                mapper.toPayload(ticket.getAgent())
        );
        sendEvent(event);
    }

    @Override
    public void publishTicketClosed(Ticket ticket) {
        TicketEventPayload payload = mapper.toPayload(ticket);
        TicketClosedEvent event = new TicketClosedEvent(
                UUID.randomUUID().toString(),
                Instant.now().toString(),
                payload
        );
        sendEvent(event);
    }

    private void sendEvent(BaseTicketEvent event) {
        try {
            log.info("Publishing event {} to queue {}", event.getEventType(), queueName);
            sqsTemplate.send(queueUrl, event);
        } catch (Exception e) {
            log.error("Failed to publish event {} to SQS", event.getEventType(), e);
        }
    }
}
