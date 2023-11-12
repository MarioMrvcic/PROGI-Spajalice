package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.Role;
import com.spajalice.ProjektSpajalice.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,Long> {
    // Custom method to find users by their role
    // Returns an Optional containing a List of users with the specified role
    Optional<List<User>> findByRole(Role role);
}
