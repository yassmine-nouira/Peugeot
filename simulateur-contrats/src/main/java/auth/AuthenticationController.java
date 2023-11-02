package auth;


import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simulateurcontrats.app.entity.RefreshToken;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

	private final AuthenticationService service ;
	
	
	
	
	@PostMapping("/registerAdmin")
	public ResponseEntity<AuthenticationResponse> registerAdmin( @RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.registerAdmin(request));	
	}
	
	@GetMapping("/checkToken")
	public ResponseEntity<String> checkToken() {
		return service.checkToken();	
	}
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(service.authenticate(request));
	}
	
	
	@PostMapping("/refreshToken")
	  public AuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refTokenRequest){
		  
		 return  service.refreshToken(refTokenRequest);
	  }
	
	
}
