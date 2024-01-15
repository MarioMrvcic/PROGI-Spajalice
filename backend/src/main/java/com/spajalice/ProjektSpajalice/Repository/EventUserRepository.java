package com.spajalice.ProjektSpajalice.Repository;

import com.spajalice.ProjektSpajalice.Model.EventUser;
import com.spajalice.ProjektSpajalice.Model.Interest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EventUserRepository extends MongoRepository<EventUser, Long> {

    List<EventUser> findAllByInterestInAndUserEmail(List<Interest> interests, String userId);

    List<EventUser> findAllByEventId(Long eventId);

    List<EventUser> findAllByUserEmail(String userEmail);

    Optional<EventUser> findByEventIdAndUserEmail(Long eventId, String userEmail);

    boolean deleteByEventIdAndUserEmail(Long eventId, String userEmail);

}
