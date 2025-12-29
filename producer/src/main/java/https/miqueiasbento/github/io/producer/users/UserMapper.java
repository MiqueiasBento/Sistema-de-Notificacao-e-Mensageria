package https.miqueiasbento.github.io.producer.users;

import https.miqueiasbento.github.io.producer.users.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    public abstract UserDto toUserDto(User user);
    public abstract User toUser(UserDto userDto);
}
