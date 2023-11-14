package com.spajalice.ProjektSpajalice.Services;

import com.spajalice.ProjektSpajalice.Model.Event;
import jakarta.annotation.PostConstruct;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.stereotype.Service;
@Service
public class IndexService {

    private final MongoTemplate mongoTemplate;

    public IndexService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void createIndexes() {
        // Index for eventName
        mongoTemplate.indexOps(Event.class).ensureIndex(new Index().on("eventName", Sort.Direction.ASC));

        // Index for eventType
        mongoTemplate.indexOps(Event.class).ensureIndex(new Index().on("eventType", Sort.Direction.ASC));

        // Index for eventLocation
        mongoTemplate.indexOps(Event.class).ensureIndex(new Index().on("eventLocation", Sort.Direction.ASC));

        // Index for eventDate
        mongoTemplate.indexOps(Event.class).ensureIndex(new Index().on("eventDate", Sort.Direction.ASC));

        // Index for eventStartTime
        mongoTemplate.indexOps(Event.class).ensureIndex(new Index().on("eventStartTime", Sort.Direction.ASC));

        // Index for eventDuration
        mongoTemplate.indexOps(Event.class).ensureIndex(new Index().on("eventDuration", Sort.Direction.ASC));
    }
}

