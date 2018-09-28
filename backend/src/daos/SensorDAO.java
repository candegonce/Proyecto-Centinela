package daos;

import modelos.Sensor;

public interface SensorDAO extends GenericDAO<Sensor>{
	public boolean existeSensor(int codigo);
	public Sensor encontrarPorCodigo(int codigo);
	
}

