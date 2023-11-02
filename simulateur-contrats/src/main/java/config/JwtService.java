package config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {

	private static final  String secretKey = "51655468576D5A7134743777217A25432A462D4A404E635266556A586E327235";
	
	
	
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}
	
	
	
	public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
		final  Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	public Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
		        .setSigningKey(getSignInKey())
		        .build()
		        .parseClaimsJws(token)
		        .getBody();
	}
	
	
	private Key getSignInKey() {
	    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
	    return Keys.hmacShaKeyFor(keyBytes);
	  }

	

	
	//////////// change from Role role to String role in parameter
	public String generateToken(UserDetails userDetails,String role) {
		Map<String, Object> claims = new HashMap<>();
		
		//&& role.equals("ADMIN")
		if(role!=null && role.equals("ADMIN") ) {
			  claims.put("role", role);
		}
		return generateToken(claims,userDetails);
	}
	
 
	private String generateToken(Map<String, Object>  extraClaims, UserDetails userDetails) {
	
		return Jwts.builder()
				.setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+ 86400000 ))
				.signWith(getSignInKey(), SignatureAlgorithm.HS256)
				.compact();
	}
	
	
	
	
	
	public Boolean isTokenValid(String token, UserDetails userDetails) {
		final String username =  extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date(System.currentTimeMillis()));
	} 
	
	
	public Date extractExpiration(String token) {
		return (Date) extractClaims(token, Claims::getExpiration);
	}
	
	
	
	
}
