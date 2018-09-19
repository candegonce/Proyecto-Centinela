package modelos;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Medicion implements Serializable, Comparable<Medicion> {
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private long idMedicion;
	
	@ManyToOne
	private Sensor dispositivo;
	
	private int dioxidoCarbono;
	
	private int temperatura;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy hh:mm:ss")
	@Temporal(TemporalType.TIMESTAMP)
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
	
	
	public int compareTo(Medicion m) {
        return this.fecha.compareTo(m.getFecha());
    }
}
