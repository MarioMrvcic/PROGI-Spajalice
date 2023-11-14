package com.spajalice.ProjektSpajalice.Model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class Photo {
    private String photoURL;
    private Date photoCreationDate;
}
