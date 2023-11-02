package com.simulateurcontrats.app.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.simulateurcontrats.app.entity.User;





@Repository
public interface UserRepository extends JpaRepository<User, Integer > {

	User findByEmail(String email);
	
	
	
	
}
