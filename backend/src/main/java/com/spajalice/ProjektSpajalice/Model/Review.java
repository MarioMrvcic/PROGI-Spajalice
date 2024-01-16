package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;

import java.util.Date;

@Data
public class Review {
    private String userEmail;
    private Date reviewCreationDate;
    private String reviewTitle;
    private String reviewBody;
    private int reviewRating;

}
