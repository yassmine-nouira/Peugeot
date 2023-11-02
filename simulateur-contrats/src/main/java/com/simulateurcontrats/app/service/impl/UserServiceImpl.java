package com.simulateurcontrats.app.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.simulateurcontrats.app.entity.User;
import com.simulateurcontrats.app.repository.UserRepository;
import com.simulateurcontrats.app.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	
	private UserRepository userRep;
	
	@Override
	public List<User> getAllUsers() {
		
		return userRep.findAll() ;
	}

}
