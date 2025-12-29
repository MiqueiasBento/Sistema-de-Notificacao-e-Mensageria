package https.miqueiasbento.github.io.producer.auth.construct;

import https.miqueiasbento.github.io.producer.users.UserService;
import https.miqueiasbento.github.io.producer.users.authorization.Role;
import https.miqueiasbento.github.io.producer.users.dto.UserRegisterDTO;
import jakarta.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class ManagerAdmin {

    @Value("${system.default.admin.email}")
    private String rootEmail;

    @Value("${system.default.admin.username}")
    private String rootUsername;

    @Value("${system.default.admin.password")
    private String rootPassword;

    private final UserService userService;

    @PostConstruct
    public void init() {
        log.info("Criação do administrador - {}", ManagerAdmin.class);

        UserRegisterDTO user = new UserRegisterDTO(rootUsername, rootEmail, rootPassword);
        userService.save(user, Role.GERENTE);
    }
}
