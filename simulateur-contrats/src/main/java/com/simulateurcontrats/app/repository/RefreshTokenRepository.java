package com.simulateurcontrats.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simulateurcontrats.app.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer>{

	Optional<RefreshToken> findByToken(String token);

}
