package https.miqueiasbento.github.io.producer.users;

import https.miqueiasbento.github.io.producer.share.globalExceptions.ResourceNotFoundException;
import https.miqueiasbento.github.io.producer.share.globalExceptions.UserNotFoundException;
import https.miqueiasbento.github.io.producer.users.authorization.Role;
import https.miqueiasbento.github.io.producer.users.dto.UserDto;
import https.miqueiasbento.github.io.producer.users.dto.UserRegisterDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User save(UserRegisterDTO dto, Role role) {
        this.validationData(dto);
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.password());
        User user = new User(
                null,
                dto.name(),
                dto.email(),
                encryptedPassword,
                role,
                LocalDate.now(),
                true);
        userRepository.save(user);

        return user;
    }

    public UserDto findByid(UUID id) {
        var user = userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ID", "Usuário com o ID: " + id + " não encontrado"));

        return userMapper.toUserDto(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Page<UserDto> findSuportes(Integer pagina, Integer tamanhoPagina) {
        Pageable pageRequest = PageRequest.of(pagina, tamanhoPagina);
        var result = userRepository.findEmployeesByUser(pageRequest, Role.SUPORTE);
        return result.map(userMapper::toUserDto);
    }

    @Transactional
    public Optional<User> updateSuporte(UUID id, UserRegisterDTO dto, User currentUser, Role role) {
        // só gerente pode alterar
        this.validationResponsible(currentUser);

        Optional<User> maybe = userRepository.findById(id);
        if (maybe.isEmpty()) {
            return Optional.empty();
        }

        User user = maybe.get();

        // validar email único quando alterado
        if (!user.getEmail().equals(dto.email())) {
            this.validationData(dto);
            user.setEmail(dto.email());
        }

        user.setName(dto.name());
        user.setRole(role);

        // atualizar senha apenas se fornecida
        if (dto.password() != null && !dto.password().isBlank()) {
            String encrypted = new BCryptPasswordEncoder().encode(dto.password());
            user.setPassword(encrypted);
        }

        User saved = userRepository.save(user);
        return Optional.of(saved);
    }

    @Transactional
    public void deleteUser(UUID id, User currentUser) {
        this.validationResponsible(currentUser);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id.toString()));

        // opcional: impedir auto-deleção
        if (currentUser.getId() != null && currentUser.getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não pode deletar a si mesmo");
        }

        userRepository.delete(user);
    }

    @Transactional
    public Optional<User> updateActive(UUID id, boolean active, User currentUser) {
        this.validationResponsible(currentUser);

        Optional<User> maybe = userRepository.findById(id);
        if (maybe.isEmpty()) {
            return Optional.empty();
        }

        User user = maybe.get();
        user.setActive(active);
        User saved = userRepository.save(user);
        return Optional.of(saved);
    }

    private void validationResponsible(User currentUser) {
        if (currentUser == null || currentUser.getRole() != Role.GERENTE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "A ação requer permissão de GERENTE");
        }
    }

    private void validationData(UserRegisterDTO dto) {
        if (this.userRepository.findByEmail(dto.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "O email informado já está cadastrado");
        }
    }
}
