package com.simulateurcontrats.app.service.impl;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simulateurcontrats.app.entity.RefreshToken;
import com.simulateurcontrats.app.repository.RefreshTokenRepository;
import com.simulateurcontrats.app.repository.UserRepository;
import com.simulateurcontrats.app.service.RefreshTokenService;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService{

	@Autowired
	private RefreshTokenRepository refTokenRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	
	public RefreshToken createRefreshToken(String email) {
		RefreshToken refToken = RefreshToken.builder()
				.user(userRepo.findByEmail(email))
				.token(UUID.randomUUID().toString())
				.expiryDate(Instant.now().plusMillis(604800000))//10
				.build();
		return refTokenRepo.save(refToken);
	}
	
	
	
	public Optional<RefreshToken>  findByToken(String token){
		 return refTokenRepo.findByToken(token);
	}
	
	
	public RefreshToken verifyExpiration(RefreshToken token) {
		if(token.getExpiryDate().compareTo(Instant.now())<0) {
			refTokenRepo.delete(token);
			throw new RuntimeException(token.getToken() + " Refresh token is expired PLZ login again");
		}
		return token;
	}
	
	
}
