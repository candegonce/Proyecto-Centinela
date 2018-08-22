package modelos;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import enumerativos.Rol;


@Entity
public class Usuario implements Serializable {
	

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private long idUsuario;
	
	private Rol rol;
	
	private String password;
	
	private String apeynom;
	
	@ManyToOne
	@Cascade(value = { CascadeType.ALL })
	private Ubicacion domicilio;
	
	private Date fechaNacimiento; 
	
	private String sexo;
	
	private String email;
	 
	private boolean habilitado = true;
	
	@OneToMany
	private List<Sensor> dispositivos;
	
	public Usuario() {
		this.dispositivos = new ArrayList<Sensor>();
	}

	public long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getApeynom() {
		return apeynom;
	}

	public void setApeynom(String apeynom) {
		this.apeynom = apeynom;
	}

	public Ubicacion getDomicilio() {
		return domicilio;
	}

	public void setDomicilio(Ubicacion domicilio) {
		this.domicilio = domicilio;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isHabilitado() {
		return habilitado;
	}

	public void setHabilitado(boolean habilitado) {
		this.habilitado = habilitado;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public List<Sensor> getDispositivos() {
		return dispositivos;
	}

	public void setDispositivos(List<Sensor> dispositivos) {
		this.dispositivos = dispositivos;
	}


}
