package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,Long> {
}
