package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<Event, Long> {
    // Custom method to find an event by its Long ID
    Optional<Event> findBy_id(Long _id);

    // Custom method using a MongoDB query to find events between specified dates
    @Query("{ 'eventDate': {$gte : ?0,$lte: ?1}}")
    Optional<List<Event>> findByEventDateBetween(Date startDate, Date endDate);

    // Custom method to delete an event by its Long ID
    void deleteBy_id(Long _id);

    // Returning all user comments for User
    List<Review> findAllByReviewsUserEmail(String userEmail);

    List<Event> findAllBy(Object o);
}
