package com.simulateurcontrats.app.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.simulateurcontrats.app.entity.Contrat;

public interface ExcelUploadService {

	boolean isValidExcelFile(MultipartFile file);

	List<Contrat> getContratDataFromExcel(InputStream inputStream) throws IOException;

}
