package https.miqueiasbento.github.io.producer.auth;

import https.miqueiasbento.github.io.producer.auth.dto.LoginDTO;
import https.miqueiasbento.github.io.producer.auth.dto.LoginResponseDTO;
import https.miqueiasbento.github.io.producer.auth.token.TokenService;
import https.miqueiasbento.github.io.producer.users.User;
import https.miqueiasbento.github.io.producer.users.UserService;
import https.miqueiasbento.github.io.producer.users.authorization.Role;
import https.miqueiasbento.github.io.producer.users.dto.UserRegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        User user = (User) auth.getPrincipal();
        String token = tokenService.generateToken(user);

        LoginResponseDTO login = new LoginResponseDTO(
                token,
                user.getEmail(),
                user.getName(),
                user.getRole()
        );

        return ResponseEntity.ok(login);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@RequestBody @Valid UserRegisterDTO dto){
        User user = userService.save(dto, Role.USUARIO);

        URI uri = URI.create("/users/" + user.getId());
        return ResponseEntity.created(uri).body(null);
    }

    @PostMapping("/register/suporte")
    public ResponseEntity<Void> registerSuporte(@RequestBody @Valid UserRegisterDTO dto){
        User user = userService.save(dto, Role.SUPORTE);

        URI uri = URI.create("/users/" + user.getId());
        return ResponseEntity.created(uri).body(null);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<Void> registerAdmin(@RequestBody @Valid UserRegisterDTO dto){
        User user = userService.save(dto, Role.GERENTE);

        URI uri = URI.create("/users/" + user.getId());
        return ResponseEntity.created(uri).body(null);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Autenticação funcionando!");
    }
}
