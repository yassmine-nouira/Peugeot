package com.simulateurcontrats.app.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="demande")
public class Demande implements Serializable {
	
	private static final long serialVersionUID = 105557L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String marque ;
	
	private String modelev ;
	
	@Column(name="duree_garantie")
	private Long dureeGarantie ;
	
	private Long km ;
	
	private String type ;
	
	private Long PUHT ;
	
	private Long PUTTC;
	
    private String nom;
	
	private String prenom;
	
	private String email;

	private String tel ;
	
	private String matricule;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	private Date ddate;

	@PrePersist
	private void oncreate() {
		ddate = new java.util.Date();
	}

}
