package com.simulateurcontrats.app.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.simulateurcontrats.app.entity.Contrat;
import com.simulateurcontrats.app.exception.ResourceNotFoundException;
import com.simulateurcontrats.app.repository.ContratRepository;
import com.simulateurcontrats.app.service.ContratService;
import com.simulateurcontrats.app.service.DemandeService;
import com.simulateurcontrats.app.service.ExcelUploadService;

import app.utils.AppUtils;
import lombok.AllArgsConstructor;




@Service
@AllArgsConstructor
public class ContratServiceImpl implements ContratService {

	
	private ContratRepository contratRepo;
	private ExcelUploadService excelUploadService;
	private DemandeService demService;
	
	@Override
	public ResponseEntity<String> createContrat(Map<String, String> requestMap) {

		Contrat contrat = new Contrat();
		
		contrat.setMarque("Peugeot");
		contrat.setModelev(requestMap.get("modelev"));
		contrat.setDureeGarantie(Long.parseLong(requestMap.get("dureeGarantie")));
		contrat.setKm(Long.parseLong(requestMap.get("km")));
		contrat.setType(requestMap.get("type"));
		contrat.setPUHT(Long.parseLong(requestMap.get("puht"))  );
		contrat.setPUTTC(Long.parseLong(requestMap.get("puttc")) );
		contrat.setStatus("true");
		
		contratRepo.save(contrat);
		
		return AppUtils.getResponseEntity("Contrat Added Successfully", HttpStatus.OK);
		
	}

	@Override
	public Contrat getContratById(Long contratId) {
		
		Contrat contrat = contratRepo.findById(contratId)
				.orElseThrow(() -> new ResourceNotFoundException("Contrat does not exist with id :" + contratId));
			return contrat;
		
	}

	@Override
	public List<Contrat> getAllContrat() {

		List<Contrat> contrats = contratRepo.findAll();
		return contrats;
		
	}

	@Override
	public ResponseEntity <String> updateContrat(Long contratId, Map<String, String> requestMap) {
		
		Contrat contrat = contratRepo.findById(contratId)
				.orElseThrow(() -> new ResourceNotFoundException("Contrat does not exist with id :" + contratId));
				
		contrat.setMarque("Peugeot");
		contrat.setModelev(requestMap.get("modelev"));
		contrat.setDureeGarantie(Long.parseLong(requestMap.get("dureeGarantie")));
		contrat.setKm(Long.parseLong(requestMap.get("km")));
		contrat.setType(requestMap.get("type"));
		contrat.setPUHT(Long.parseLong( requestMap.get("puht")));
		contrat.setPUTTC(Long.parseLong (requestMap.get("puttc")));
		
		contrat.setStatus(contrat.getStatus());
					
		contratRepo.save(contrat);
		return AppUtils.getResponseEntity("Contrat Updated Successfully", HttpStatus.OK);	
		
	}

	@Override
	public void deleteContrat(Long contratId) {

		contratRepo.findById(contratId)
				.orElseThrow(() -> new ResourceNotFoundException("Contrat does not exist with id :" + contratId));
				
		contratRepo.deleteById(contratId);
		
		
	}

	
	@Override
	public List<String> getModeleVs() {

		return  contratRepo.getModelevs();
		
	}
	
	
	
	@Override
	public List<String> getTypes(String modele) {

		return  contratRepo.getTypes(modele);
		
	}
	
	
	
	@Override
	public List<String> getDureeGaranties(String modele,String type) {

		return  contratRepo.getDureeGaranties(modele, type);
		
	}
	
	
	@Override
	public List<String> getKms(String modele, String type, String dureeGarantie) {

		return  contratRepo.getKms(modele, type, Long.parseLong(dureeGarantie));
		
	}
	
	
	
	@Override
	public String getPUHTs(String modele, String type, Long dureeGarantie,  Long km) {

		return  contratRepo.getPUHTs(modele, type, dureeGarantie,km);
	
	}
	
	@Override
	public String getPUTTCs(String modele, String type, Long dureeGarantie,  Long km) {

		return  contratRepo.getPUTTCs(modele, type, dureeGarantie,km);
	
	}
	
	
	@Override
	public ResponseEntity<String> updateStatus(Map<String, String> requestMap) {
				
		contratRepo.findById(Long.parseLong(requestMap.get("id")))
						.orElseThrow(() -> new ResourceNotFoundException("Contract does not exist with id :" + requestMap.get("id")));
					
						
		        contratRepo.updateStatus(requestMap.get("status"), Long.parseLong(requestMap.get("id")));
						
						return AppUtils.getResponseEntity("Contract Status Updated Successfully", HttpStatus.OK);
						
						
		}
	
	
	
	@Override
	public void saveContratsToDatabase(MultipartFile file) {
		if(excelUploadService.isValidExcelFile(file)) {
			try {
				List<Contrat> contrats = excelUploadService.getContratDataFromExcel(file.getInputStream());
				contratRepo.saveAll(contrats);
				
			} catch (IOException | IllegalStateException e) {
				throw new IllegalArgumentException("The file is not a valid excel file");
			}
		}
	}

	
	@Override
	public void deleteOLdData() {
		contratRepo.deleteOLdData();
		
	}
	
	@Override
	public Map<Contrat,Integer> getChartInfo(){
			Map<Contrat,Integer> map= new HashMap<Contrat,Integer>();
			List<Contrat> cons = contratRepo.findAll();
			
			for(Contrat c:cons ) {
				int nb = demService.getNbContratByDemande(c);
				map.put(c,nb);
				nb=0;
			}
			return map;
		}
	
	@Override
	public long getNbContrat() {

		return contratRepo.count();
		
	}
	
}
