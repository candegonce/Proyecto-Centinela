package daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import conexion.EMF;
import modelos.Medicion;


public class MedicionDAOImp extends GenericDAOImp<Medicion> implements MedicionDAO {

	public MedicionDAOImp() {
		super(Medicion.class);
	}
		
	@SuppressWarnings("unchecked")
	@Override
	public List<Medicion> obtenerMedicionesSensor(long idSensor) {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta= em.createQuery("from " + this.getPersistentClass().getSimpleName() + " where dispositivo.idSensor = :idSensor");
		consulta.setParameter("idSensor", idSensor);
		List<Medicion> resultado = consulta.getResultList();
		return resultado;
	}
}
