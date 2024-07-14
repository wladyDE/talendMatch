package com.quinscape;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.quinscape")
public class TalendMatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(TalendMatchApplication.class, args);
	}

}
