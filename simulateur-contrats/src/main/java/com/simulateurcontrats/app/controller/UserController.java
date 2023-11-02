package com.simulateurcontrats.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simulateurcontrats.app.entity.User;
import com.simulateurcontrats.app.service.UserService;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	
	private UserService service;
	
	@GetMapping(path = "/get")
	public ResponseEntity<List<User>> getAllUsers( ){
		
		List<User> us = service.getAllUsers();
		
		return ResponseEntity.ok(us);
	}

	
	
	
}
