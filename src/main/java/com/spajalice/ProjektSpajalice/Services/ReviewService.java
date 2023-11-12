package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Model.Review;
import com.spajalice.ProjektSpajalice.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Creates a new review for an event and associates it with the event.
     *
     * @param reviewBody The body of the review.
     * @param eventId    The ID of the event to associate the review with.
     * @return The created review.
     */
    public Review createReview(String reviewBody, Long eventId) {
        // Create a new review with the specified body
        Review review = reviewRepository.insert(new Review(reviewBody));

        // Update the associated event by pushing the review ID to its reviewIds list
        mongoTemplate.update(Event.class)
                .matching(Criteria.where("id").is(eventId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        // Return the created review
        return review;
    }
}
