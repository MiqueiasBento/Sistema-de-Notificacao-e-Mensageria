package https.miqueiasbento.github.io.producer.users;

import https.miqueiasbento.github.io.producer.users.authorization.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.role = :role")
    Page<User> findEmployeesByUser(Pageable pageable, @Param("role") Role role);
}
