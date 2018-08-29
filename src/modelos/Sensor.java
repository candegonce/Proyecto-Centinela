package modelos;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import enumerativos.Estado;


@Entity
public class Sensor implements Serializable {
	

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private long idSensor;
	
	private String nombreSensor;
	
	@ManyToOne
	@Cascade(value = { CascadeType.ALL })
	private Ubicacion ubicacion;
	
	private int codigo;
	
	private int bateria;
	
	private Estado estado = Estado.ACTIVO;
	
	public Sensor() {}

	public long getIdSensor() {
		return idSensor;
	}

	public void setIdSensor(long idSensor) {
		this.idSensor = idSensor;
	}

	public String getNombreSensor() {
		return nombreSensor;
	}

	public void setNombreSensor(String nombreSensor) {
		this.nombreSensor = nombreSensor;
	}

	public Ubicacion getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(Ubicacion ubicacion) {
		this.ubicacion = ubicacion;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public int getBateria() {
		return bateria;
	}

	public void setBateria(int bateria) {
		this.bateria = bateria;
	}

	


}
