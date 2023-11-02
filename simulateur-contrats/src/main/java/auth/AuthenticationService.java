package auth;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.simulateurcontrats.app.entity.RefreshToken;
import com.simulateurcontrats.app.entity.User;
import com.simulateurcontrats.app.exception.ResourceNotFoundException;
import com.simulateurcontrats.app.repository.UserRepository;
import com.simulateurcontrats.app.service.RefreshTokenService;

import app.utils.AppUtils;
import config.JwtService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;

	private final JwtService jwtService ;
	private final AuthenticationManager authenticationManager;
	
	
	private final RefreshTokenService refTokenService; 
	
	

	public AuthenticationResponse registerAdmin(RegisterRequest request) {
		var user = User.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))				
				.role("ADMIN")
				.build();
		repository.save(user);
		var jwtToken = jwtService.generateToken(user,"ADMIN");
		
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	
	
	  public AuthenticationResponse authenticate(AuthenticationRequest request) {
		    authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()) );
		    
		    var user = repository.findByEmail(request.getEmail());
		       // .orElseThrow( ()-> new ResourceNotFoundException("user does not exist with email  :" + request.getEmail()));
		    
		    RefreshToken refToken = refTokenService.createRefreshToken(request.getEmail());
		    var jwtToken = jwtService.generateToken(user,user.getRole());
		   
		    return AuthenticationResponse.builder()
		    	.accessToken(jwtToken)
		        .token(refToken.getToken())
		        .build();
		  }

	
	
	  
	 
	  public AuthenticationResponse refreshToken( RefreshTokenRequest refTokenRequest){
		  
		 return  refTokenService.findByToken(refTokenRequest.getToken())
		   			.map(refTokenService::verifyExpiration)
		   			.map(RefreshToken::getUser)
		   			.map(user -> {
		   				String accessToken = jwtService.generateToken(user,user.getRole());
		   				return AuthenticationResponse.builder()
		   				    	.accessToken(accessToken)
		   				        .token(refTokenRequest.getToken())
		   				        .build();
		   			} ).orElseThrow(()-> new RuntimeException("Refresh token is not in database"));
  
	  }
	  
	  
  


	public ResponseEntity<String>  checkToken() {
		
		return AppUtils.getResponseEntity("True", HttpStatus.OK);
	}
	 
	
	/*public ResponseEntity<String> logIn(Map<String, String> requestMap) {
		//log.info("Inside logIn");
			Authentication auth = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password"))) ;
		var user = repository.findByEmail(requestMap.get("email"))
		        .orElseThrow();
			if(auth.isAuthenticated()) {
				return new ResponseEntity<String>("{\"token\":\""+ 
						jwtService.generateToken(user,user.getRole()) + "\"}" ,
							HttpStatus.OK);
				
				
			
			}
		
		return new ResponseEntity<String>("{\"message\":\""+"Bad credentials" +"\"}", HttpStatus.BAD_REQUEST);
	
		
	}		
	*/
}
