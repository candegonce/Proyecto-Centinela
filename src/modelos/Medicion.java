package modelos;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;


@Entity
public class Medicion implements Serializable {
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idMedicion;
	
	@OneToOne
	private Sensor dispositivo;
	
	private int dioxidoCarbono;
	
	private int temperatura;
	
	private Date fecha; 
	
	public Medicion() {}

	public long getIdMedicion() {
		return idMedicion;
	}

	public void setIdMedicion(long idMedicion) {
		this.idMedicion = idMedicion;
	}

	public Sensor getDispositivo() {
		return dispositivo;
	}

	public void setDispositivo(Sensor dispositivo) {
		this.dispositivo = dispositivo;
	}

	public int getDioxidoCarbono() {
		return dioxidoCarbono;
	}

	public void setDioxidoCarbono(int dioxidoCarbono) {
		this.dioxidoCarbono = dioxidoCarbono;
	}

	public int getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(int temperatura) {
		this.temperatura = temperatura;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
}
