package com.simulateurcontrats.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;



@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan(basePackages = "config")
@ComponentScan(basePackages = "auth")
public class SimulateurContratsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimulateurContratsApplication.class, args);
	}

}
