package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, Integer> {
}
