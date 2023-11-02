package com.simulateurcontrats.app.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.simulateurcontrats.app.entity.RefreshToken;


public interface RefreshTokenService {

	RefreshToken createRefreshToken(String email);
	RefreshToken verifyExpiration(RefreshToken token);
	Optional<RefreshToken>  findByToken(String token);
}
