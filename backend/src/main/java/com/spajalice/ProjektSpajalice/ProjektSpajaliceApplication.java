package com.spajalice.ProjektSpajalice;

import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories; // Import this


import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })


@CrossOrigin(origins = "https://spring-render-e8xw.onrender.com")
@RestController
@EnableMongoRepositories(basePackages = "com.spajalice.ProjektSpajalice.Repository")
public class ProjektSpajaliceApplication {

	@Autowired
	EventRepository eventRepository;

	public static void main(String[] args) {
		SpringApplication.run(ProjektSpajaliceApplication.class, args);
	}

	@GetMapping("/")
	public String apiRoot() {
		return "Hello World!";
	}
}
