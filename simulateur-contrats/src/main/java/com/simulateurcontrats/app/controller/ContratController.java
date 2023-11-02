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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.simulateurcontrats.app.entity.Contrat;
import com.simulateurcontrats.app.service.ContratService;

import app.utils.AppUtils;
import lombok.AllArgsConstructor;



@AllArgsConstructor
@RestController
@RequestMapping("/api/contrat")
@CrossOrigin(origins = "http://localhost:4200")
public class ContratController {

	private ContratService service;
	
	@PostMapping(path = "/add")
	public ResponseEntity<String>  createContrat (@RequestBody Map<String, String> requestMap){
		
	
		return service.createContrat(requestMap);
	}
	
	@GetMapping(path = "/get/{id}")
	public ResponseEntity<Contrat> getContratById(@PathVariable("id") Long contratId){
		
		Contrat contratDto = service.getContratById(contratId);
		
		return ResponseEntity.ok(contratDto);
	}
	
	@GetMapping(path = "/get")
	public ResponseEntity<List<Contrat>> getAllContrat(){
		
		List<Contrat> contrats = service.getAllContrat();
		
		return ResponseEntity.ok(contrats);
		
	}
	
	@PutMapping(path = "/update/{id}" )
	public ResponseEntity<String> updateContrat(@PathVariable("id") Long contratId,	@RequestBody  Map<String, String> requestMap){
		
		return service.updateContrat(contratId, requestMap);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public ResponseEntity<String> deleteContrat(@PathVariable("id") Long contratId){
		
		service.deleteContrat(contratId);
		
		return AppUtils.getResponseEntity("Contrat Deleted Successfully", HttpStatus.OK);
	}
	
	
	@GetMapping(path = "/get/modelev")
	public ResponseEntity<List<String>> getModeleV(){
		
		List<String> modeles = service.getModeleVs();
		
		return ResponseEntity.ok(modeles);
		
	}
	
	
	
	@GetMapping(path = "/get/type/{modele}")
	public ResponseEntity<List<String>> getTypeGarantie(@PathVariable("modele") String modele){
		
		List<String> gs = service.getTypes(modele);
		
		return ResponseEntity.ok(gs);
		
	}
	
	
	
	@GetMapping(path = "/get/dureeGarantie/{modele}/{type}")
	public ResponseEntity<List<String>> getDureeGarantie(@PathVariable("modele") String modele,@PathVariable("type")String type){
		
		List<String> gs = service.getDureeGaranties(modele,type);
		
		return ResponseEntity.ok(gs);
		
	}
	
	
	@GetMapping(path = "/get/km/{modele}/{type}/{dureeGarantie}")
	public ResponseEntity<List<String>> getKm(@PathVariable("modele") String modele,@PathVariable("type")String type,
			@PathVariable("dureeGarantie") String dureeGarantie){
		
		List<String> gs = service.getKms(modele,type, dureeGarantie);
		
		return ResponseEntity.ok(gs);
		
	}
	
	
	@GetMapping(path = "/get/puhts/{modele}/{type}/{dureeGarantie}/{km}")
	public ResponseEntity<String> getPUHT(@PathVariable("modele") String modele,@PathVariable("type")String type,
			@PathVariable("dureeGarantie") Long dureeGarantie, @PathVariable("km") Long km){
		
		String gs = service.getPUHTs(modele,type, dureeGarantie,km);
		
		return ResponseEntity.ok(gs);
		
	}
	
	@GetMapping(path = "/get/puttc/{modele}/{type}/{dureeGarantie}/{km}")
	public ResponseEntity<String> getPUTTC(@PathVariable("modele") String modele,@PathVariable("type")String type,
			@PathVariable("dureeGarantie") Long dureeGarantie, @PathVariable("km") Long km){
		
		String gs = service.getPUTTCs(modele,type, dureeGarantie,km);
		
		return ResponseEntity.ok(gs);
		
	}
	
	
	@PostMapping(path = "/update/status")
	public ResponseEntity<String> updateStatus( @RequestBody Map<String, String> requestMap){
		return service.updateStatus(requestMap);
	}
	
	
	@PostMapping(path = "/exceltodatabse")
	public ResponseEntity<?> uploadContratsData( @RequestParam("file")MultipartFile file ){
		if(file.isEmpty()) {
			return ResponseEntity.ok(Map.of("Message","File is empty"));
		}
		try {
			service.deleteOLdData();
			service.saveContratsToDatabase(file);
			 return ResponseEntity.ok(Map.of("Message","Contrats data uploaded and saved to database successfully"));
		}catch(IllegalArgumentException e) {
			return AppUtils.getResponseEntity("The file is not a valid excel file",HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@GetMapping(path = "/getChartInfo")
	public ResponseEntity<Map<Contrat,Integer>> getChartInfo(){
		
		Map<Contrat,Integer> gs = service.getChartInfo();
		
		return ResponseEntity.ok(gs);
		
	}
	
	@GetMapping(path = "/getNbContrat")
	public ResponseEntity<Long> getNbContrat(){
		
		Long dems = service.getNbContrat();
		
		return ResponseEntity.ok(dems);
		
	}
	
	
}
