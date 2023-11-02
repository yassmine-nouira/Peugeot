package com.simulateurcontrats.app.entity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshToken {

	 @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Integer id;

	 private String token;

	  private Instant expiryDate;

	  @ManyToOne(fetch = FetchType.LAZY)
	  @JoinColumn(name = "user_id" , referencedColumnName  = "id")
	  public User user;
}
