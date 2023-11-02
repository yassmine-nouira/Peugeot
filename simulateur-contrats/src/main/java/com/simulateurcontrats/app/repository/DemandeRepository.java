package com.simulateurcontrats.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.simulateurcontrats.app.entity.Demande;

public interface DemandeRepository extends JpaRepository<Demande, Long> {

 @Query(value = "SELECT COUNT(*) FROM Demande d  where d.modelev=:modele and d.type=:type  and d.dureeGarantie=:dureeGarantie and d.km=:km  ")	
 int getNbContratByDemande(@Param("modele") String modele,@Param("type") String type,@Param("dureeGarantie") Long dureeGarantie, @Param("km") Long km); 
	
 
/*
 @Query(value = "select * from Demande  order by ddate desc  limit 4")
 List<Demande> getLastDemande();
 
  //Demande getLastDemande();
 
 
 
 /*@Query(value = "SELECT COUNT * FROM Demande")
 int getNbDemande();
*/
 
}
