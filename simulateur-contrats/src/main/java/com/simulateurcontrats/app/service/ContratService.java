package com.simulateurcontrats.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.simulateurcontrats.app.entity.Contrat;

public interface ContratService {

	
	//ContratDto createContrat (ContratDto contratDto);
	
	Contrat getContratById (Long contratId);
	
	List<Contrat> getAllContrat ();
	
	void deleteContrat(Long contratId);
	
	ResponseEntity<String> createContrat(Map<String, String> contratDto);

	ResponseEntity<String> updateContrat(Long contratId, Map<String, String> requestMap);
		
	ResponseEntity<String> updateStatus(Map<String, String> requestMap);

	List<String> getModeleVs();

	List<String> getTypes(String modele);

	List<String> getDureeGaranties(String modele, String type);

	List<String> getKms(String modele, String type, String dureeGarantie);

	String getPUHTs(String modele, String type, Long dureeGarantie, Long km);

	String getPUTTCs(String modele, String type, Long dureeGarantie, Long km);

	void saveContratsToDatabase(MultipartFile file);

	void deleteOLdData();

	Map<Contrat, Integer> getChartInfo();

	long getNbContrat();



	
	
}
