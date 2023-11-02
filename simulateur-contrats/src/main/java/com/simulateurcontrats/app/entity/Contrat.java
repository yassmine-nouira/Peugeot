package com.simulateurcontrats.app.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NamedQuery(name = "Contrat.updateStatus" , query = "update Contrat  set status=:status where id=:id ")


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="contrat")
public class Contrat implements Serializable{
	
	private static final long serialVersionUID = 1L;

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
	
	private String status;
	
	
	
}
