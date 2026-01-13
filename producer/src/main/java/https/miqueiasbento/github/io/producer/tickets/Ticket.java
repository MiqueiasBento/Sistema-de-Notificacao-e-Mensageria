package https.miqueiasbento.github.io.producer.tickets;

import https.miqueiasbento.github.io.producer.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, columnDefinition = "varchar(150)")
    private String title;

    @Column(nullable = false, columnDefinition = "varchar(200)")
    private String description;

    @Column(nullable = false)
    private TypeTicket type;

    @Column(nullable = false)
    private StatusTicket status;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private User agent;

    private LocalDateTime createAt;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Channel> channels;

}
