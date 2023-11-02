package com.simulateurcontrats.app.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.simulateurcontrats.app.entity.Contrat;
import com.simulateurcontrats.app.entity.Demande;
import com.simulateurcontrats.app.exception.ResourceNotFoundException;
import com.simulateurcontrats.app.repository.DemandeRepository;
import com.simulateurcontrats.app.service.DemandeService;


import app.utils.AppUtils;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DemandeServiceImpl  implements DemandeService{

	private DemandeRepository demRepo;
	
	@Override
	public Demande getDemandeById(Long demId) {
		
		Demande demande = demRepo.findById(demId)
				.orElseThrow(() -> new ResourceNotFoundException("Demande does not exist with id :" + demId));
			return demande;
	}

	@Override
	public List<Demande> getAllDemande() {
		List<Demande> dems = demRepo.findAll();
		return dems;
	}

	@Override
	public void deleteDemande(Long demId) {
		demRepo.findById(demId)
			.orElseThrow(() -> new ResourceNotFoundException("Demande does not exist with id :" + demId));
		
		demRepo.deleteById(demId);
	}

	@Override
	public ResponseEntity<String> createDemande(Map<String, String> requestMap) {
		
		Demande demande = new Demande();
		
		demande.setMarque("Peugeot");
		demande.setModelev(requestMap.get("modelev"));
		demande.setDureeGarantie(Long.parseLong(requestMap.get("dureeGarantie")));
		demande.setKm(Long.parseLong(requestMap.get("km")));
		demande.setType(requestMap.get("type"));
		demande.setPUHT(Long.parseLong(requestMap.get("puht"))  );
		demande.setPUTTC(Long.parseLong(requestMap.get("puttc")) );
		demande.setNom(requestMap.get("nom"));
		demande.setPrenom(requestMap.get("prenom"));
		demande.setTel(requestMap.get("tel"));
		demande.setEmail(requestMap.get("email"));
		demande.setMatricule(requestMap.get("matricule"));
		
		demRepo.save(demande);
		
		return AppUtils.getResponseEntity("Demande Added Successfully", HttpStatus.OK);
	}

	@Override
	public int getNbContratByDemande(Contrat c) {

		return demRepo.getNbContratByDemande(c.getModelev(),c.getType(),c.getDureeGarantie(),c.getKm());
		
	}
	
	@Override
	public Long getNbDemande() {

		return demRepo.count();
		
	}
	
/*	@Override
	public  List<Demande> getLastDemande() {

		return demRepo.getLastDemande();
		
	}
	*/
	

}
