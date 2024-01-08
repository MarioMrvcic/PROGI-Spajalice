package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("Places")
public class Place {

    @Id
    private Long _Id;

    private String Name;

    private Integer ZipCode;

    private String ParentCity;

    private String  County;
}
