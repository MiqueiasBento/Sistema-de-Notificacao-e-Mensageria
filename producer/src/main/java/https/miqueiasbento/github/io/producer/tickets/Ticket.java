package https.miqueiasbento.github.io.producer.tickets;

import https.miqueiasbento.github.io.producer.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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

    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String title;

    @Column(nullable = false, columnDefinition = "varchar(200)")
    private String description;

    @Column(nullable = false)
    private TypeTicket type;

    @Column(nullable = false)
    private StatusTicket status;

    private LocalDateTime createAt;
}
