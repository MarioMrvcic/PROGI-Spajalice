package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.EventUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventUserRepository extends MongoRepository<EventUser, Long> {
}
