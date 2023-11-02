package com.simulateurcontrats.app.service.impl;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.simulateurcontrats.app.entity.Contrat;
import com.simulateurcontrats.app.repository.ContratRepository;
import com.simulateurcontrats.app.service.ExcelUploadService;

import io.jsonwebtoken.io.IOException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ExcelUploadServiceImpl implements ExcelUploadService {

	
	@Override
	public  boolean isValidExcelFile(MultipartFile file) {
		
		return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	}
	
	
	@Override
	public  List<Contrat> getContratDataFromExcel(InputStream inputStream) throws java.io.IOException{
		List<Contrat> contrats = new ArrayList<>();
		
		try {
			
			XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
		
		   XSSFSheet sheet = workbook.getSheetAt(0);  //workbook.getSheet("Peugeot")
			
			int rowIndex = 0;
			for(Row row : sheet) {
				if(rowIndex==0) {
					//String cellName = row.getCell()  .getStringCellValue();
					rowIndex++;
					continue;
				}
				Iterator<Cell> cellIterator = row.iterator();
				int cellIndex = 0;
				
				Contrat contrat = new Contrat();
				while(cellIterator.hasNext()) {
					Cell cell = cellIterator.next();
					switch (cellIndex) {		
						case 0 : contrat.setMarque(cell.getStringCellValue());break;
						case 1 : contrat.setType(cell.getStringCellValue());break;
						case 2 : contrat.setDureeGarantie((long)cell.getNumericCellValue());break;
						case 3 : contrat.setKm((long)cell.getNumericCellValue());break;
						case 4 : contrat.setModelev(cell.getStringCellValue());break;
						case 5 : contrat.setPUHT((long) cell.getNumericCellValue());break;
						case 6 : contrat.setPUTTC((long)cell.getNumericCellValue()); contrat.setStatus("true");break;
						default : {
							
						}
						
					}
					
					cellIndex++;    
				}
				contrats.add(contrat);
				
			}
			
			
		} catch(IOException | IllegalStateException e) {
			e.getStackTrace();
			throw e;
		}
		return contrats;
		
	}

	
	
	
}
