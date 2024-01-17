package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {

    Optional<List<User>> findByRole(Role role);

    Optional<User> findByEmail(String email);

    List<User> findByintrestedInTypesContaining(EventType type);

    List<User> findByintrestedInPlaceContaining(PlaceSimple placeSimple);
}
