package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;

import java.util.Date;

@Data
public class Review {
    private String reviewBody;
    private Date reviewCreationDate;
}
