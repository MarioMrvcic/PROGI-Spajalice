package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends MongoRepository<Review, Long> {
    // Custom method to delete a review by its ObjectId ID
    void deleteById(ObjectId id);

}
