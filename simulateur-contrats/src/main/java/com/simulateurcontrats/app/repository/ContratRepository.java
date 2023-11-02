package com.simulateurcontrats.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.simulateurcontrats.app.entity.Contrat;

import jakarta.transaction.Transactional;



public interface ContratRepository extends JpaRepository<Contrat, Long> {

	@Query(value = "SELECT DISTINCT  c.modelev FROM Contrat c where c.status='true' ")
	List<String> getModelevs();
	
	
	@Query(value = "SELECT DISTINCT  c.type  FROM Contrat c   where c.modelev=:modele  and c.status='true' ")
	List<String> getTypes(@Param("modele") String modele);
	
	
	@Query(value = "SELECT DISTINCT  c.dureeGarantie FROM Contrat c  where c.modelev=:modele and c.type=:type  and c.status='true' ")
	List<String> getDureeGaranties(@Param("modele") String modele,@Param("type") String type);
	
	@Query(value = "SELECT DISTINCT  c.km FROM Contrat c  where c.modelev=:modele and c.type=:type  and c.dureeGarantie=:dureeGarantie  and c.status='true'")
	List<String> getKms(@Param("modele") String modele,@Param("type") String type,@Param("dureeGarantie") Long dureeGarantie);
	
	@Query(value = "SELECT DISTINCT c.PUHT FROM Contrat c where c.modelev=:modele and c.type=:type  and c.dureeGarantie=:dureeGarantie and c.km=:km  and c.status='true'")
	String getPUHTs(@Param("modele") String modele,@Param("type") String type,@Param("dureeGarantie") Long dureeGarantie, @Param("km") Long km);

	@Query(value = "SELECT DISTINCT c.PUTTC FROM Contrat c where c.modelev=:modele and c.type=:type  and c.dureeGarantie=:dureeGarantie and c.km=:km  and c.status='true'")
	String getPUTTCs(@Param("modele") String modele,@Param("type") String type,@Param("dureeGarantie") Long dureeGarantie, @Param("km") Long km); 
	
	@Modifying
	@Transactional
	Integer updateStatus(@Param("status") String status, @Param("id") Long id);


	@Modifying
	@Transactional
	@Query(value = "Truncate table Contrat", nativeQuery = true)
	void deleteOLdData();
	
	
/*	@Query(value = "SELECT COUNT * FROM Contrat")
	 int getNbContrat();
	 */
}
