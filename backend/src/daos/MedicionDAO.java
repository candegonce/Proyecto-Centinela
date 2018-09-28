package daos;

import java.util.List;

import modelos.Medicion;

public interface MedicionDAO extends GenericDAO<Medicion>{

	List<Medicion> obtenerMedicionesSensor(long idSensor);
	
}

