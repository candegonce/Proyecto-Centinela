package daos;

import modelos.Sensor;

public interface SensorDAO extends GenericDAO<Sensor>{
	public boolean existeSensor(String codigo);
	
}

