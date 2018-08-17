package daos;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import conexion.EMF;
import modelos.Sensor;

public class SensorDAOImp extends GenericDAOImp<Sensor> implements SensorDAO {

	public SensorDAOImp() {
		super(Sensor.class);
	}
		
	@Override
	public boolean existeSensor(String codigo) {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta= em.createQuery("from " + this.getPersistentClass().getSimpleName() + " where codigo= :codigo");
		consulta.setParameter("codigo", codigo);
		if (consulta.getResultList().size() == 0) {
			return false;
		}else {
			return true;
		}
	}
}
