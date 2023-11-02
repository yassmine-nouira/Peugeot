package com.simulateurcontrats.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.simulateurcontrats.app.entity.Contrat;
import com.simulateurcontrats.app.entity.Demande;



public interface DemandeService {

	Demande getDemandeById (Long demId);
	
	List<Demande> getAllDemande ();
	
	void deleteDemande(Long demId);
	
	ResponseEntity<String> createDemande(Map<String, String> requestMap);

	int getNbContratByDemande(Contrat c);

	Long getNbDemande();

	//List<Demande> getLastDemande();

	//ResponseEntity<String> updateDemande(Long contratId, Map<String, String> requestMap);
		
	

	
}
