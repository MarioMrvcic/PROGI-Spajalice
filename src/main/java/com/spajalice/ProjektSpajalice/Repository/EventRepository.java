package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<Event, Integer> {
    Optional<Event> findById(Long id);

    Optional<List<Event>> findByEventLocation(String eventLocation);

    @Query("{ 'eventDate': {$gte : ?0,$lte: ?1}}")
    Optional<List<Event>> findByEventDateBetween(Date startDate,Date endDate);

}
