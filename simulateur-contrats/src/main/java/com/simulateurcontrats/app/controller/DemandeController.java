package com.simulateurcontrats.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simulateurcontrats.app.entity.Demande;
import com.simulateurcontrats.app.service.DemandeService;

import app.utils.AppUtils;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/demande")
@CrossOrigin(origins = "http://localhost:4200")
public class DemandeController {

	private DemandeService service;
	
	@PostMapping(path = "/add")
	public ResponseEntity<String>  createDemande (@RequestBody Map<String, String> requestMap){
		
	
		return service.createDemande(requestMap);
	}
	
	@GetMapping(path = "/get/{id}")
	public ResponseEntity<Demande> getDemandeById(@PathVariable("id") Long demID){
		
		Demande demDto = service.getDemandeById(demID);
		
		return ResponseEntity.ok(demDto);
	}
	
	@GetMapping(path = "/get")
	public ResponseEntity<List<Demande>> getAllDemande(){
		
		List<Demande> dems = service.getAllDemande();
		
		return ResponseEntity.ok(dems);
		
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public ResponseEntity<String> deleteDemande(@PathVariable("id") Long demID){
		
		service.deleteDemande(demID);
		
		return AppUtils.getResponseEntity("Demande Deleted Successfully", HttpStatus.OK);
	}
	
	
	@GetMapping(path = "/getNbDemande")
	public ResponseEntity<Long> getNbDemande(){
		
		Long dems = service.getNbDemande();
		
		return ResponseEntity.ok(dems);
		
	}
	
/*	@GetMapping(path = "/getLastDemande")
	public ResponseEntity<List<Demande>> getLastDemande(){
		
		List<Demande> dems = service.getLastDemande();
		
		return ResponseEntity.ok(dems);
		
	}
	*/
	
}
