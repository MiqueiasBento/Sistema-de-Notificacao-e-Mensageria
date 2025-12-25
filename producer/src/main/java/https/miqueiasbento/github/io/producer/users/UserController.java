package https.miqueiasbento.github.io.producer.users;

import https.miqueiasbento.github.io.producer.share.notations.currentUser.CurrentUser;
import https.miqueiasbento.github.io.producer.users.authorization.Role;
import https.miqueiasbento.github.io.producer.users.dto.UserDto;
import https.miqueiasbento.github.io.producer.users.dto.UserRegisterDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    
    @GetMapping("/suportes")
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<Page<UserDto>> findEmployes(
            @RequestParam(value = "pagina", defaultValue = "0") Integer pagina,
            @RequestParam(value = "tamanho-pagina", defaultValue = "10") Integer tamanhoPagina
    ) {
        Page<UserDto> users = userService.findSuportes(pagina, tamanhoPagina);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/suporte/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<UserDto> findById(
            @PathVariable UUID id,
            @CurrentUser User currentUser
    ) {
        return ResponseEntity.ok().body(userService.findByid(id));
    }

    @PutMapping("/{id}/suporte")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> updateSuporte(
            @PathVariable UUID id,
            @RequestBody UserRegisterDTO user,
            @CurrentUser User currentUser
    ) {
        return userService.updateSuporte(id, user, currentUser, Role.SUPORTE)
                .map(updatedUser -> ResponseEntity.noContent().build())
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteUser(
            @PathVariable UUID id,
            @CurrentUser User currentUser
    ) {
        userService.deleteUser(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/active")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> updateActive(
            @PathVariable UUID id,
            @RequestParam("active") boolean active,
            @CurrentUser User currentUser
    ) {
        return userService.updateActive(id, active, currentUser)
                .map(u -> ResponseEntity.noContent().build())
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
