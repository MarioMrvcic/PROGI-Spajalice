package com.spajalice.ProjektSpajalice.Controller;

import com.spajalice.ProjektSpajalice.Model.Review;
import com.spajalice.ProjektSpajalice.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    /**
     * Endpoint to create a new review.
     *
     * @param payload A map containing the review body and event ID.
     * @return ResponseEntity with the created review or an error status.
     */
    @PostMapping("/addReview")
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
        try {
            // Extract review body and event ID from the payload
            String reviewBody = payload.get("reviewBody");
            Long eventId = Long.valueOf(payload.get("eventId"));

            // Create and add the review, associating it with the specified event
            Review review = reviewService.createReview(reviewBody, eventId);

            // Return the created review
            return new ResponseEntity<>(review, HttpStatus.CREATED);
        } catch (NumberFormatException e) {
            // Handle the case where eventId cannot be parsed to Long
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Return an error response in case of other exceptions
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
