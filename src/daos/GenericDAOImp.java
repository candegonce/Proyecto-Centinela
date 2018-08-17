package daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import conexion.EMF;

public class GenericDAOImp<T> implements GenericDAO<T> {

	private Class<T> PersistentClass;

	public GenericDAOImp(Class<T> entidad) {
		this.PersistentClass = entidad;
	}

	public Class<T> getPersistentClass() {
		return PersistentClass;
	}

	public void setPersistentClass(Class<T> persistentClass) {
		PersistentClass = persistentClass;
	}

	@PersistenceContext
	private EntityTransaction etx;

	@Override
	public T persistir(T entity) {
		EntityManager em = EMF.getEMF().createEntityManager();
		try {
			etx = em.getTransaction();
			etx.begin();
			em.persist(entity);
			etx.commit();
		} catch (RuntimeException e) {
			if (etx != null && etx.isActive())
				etx.rollback();
			throw e; // escribir en un log o mostrar un mensaje
		} finally {
			em.close();
		}
		return entity;
	}

	@Override
	public void borrar(T entity) {
		EntityManager em = EMF.getEMF().createEntityManager();
		try {
			etx = em.getTransaction();
			etx.begin();
			em.remove(em.contains(entity) ? entity : em.merge(entity));
			etx.commit();
		} catch (RuntimeException e) {
			if (etx != null && etx.isActive())
				etx.rollback();
			throw e; // escribir en un log o mostrar un mensaje
		} finally {
			em.close();
		}
	}

	@Override
	public List<T> recuperarTodosOrdenados(String columnOrder) {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta = em
				.createQuery("from " + this.getPersistentClass().getSimpleName() + " order by " + columnOrder);
		List<T> resultado = (List<T>) consulta.getResultList();
		return resultado;
	}

	@SuppressWarnings({ "unused", "unchecked" })
	@Override
	public void borrarTodos() {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta = em.createQuery("FROM " + this.getPersistentClass().getSimpleName());
		List<T> lista = consulta.getResultList();
		for (T ent : lista) {
			this.borrar(ent);
		}
	}

	@Override
	public T actualizar(T entity) {
		EntityManager em = EMF.getEMF().createEntityManager();
		EntityTransaction etx = em.getTransaction();
		etx.begin();
		entity = em.merge(entity); 									
		etx.commit();
		em.close();
		return entity;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<T> listar() {
		EntityManager em = EMF.getEMF().createEntityManager();
		return em.createQuery("from " + this.getPersistentClass().getSimpleName()).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public T encontrarPorId(long id) {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta = em.createQuery("from " + this.getPersistentClass().getSimpleName() + " where id= :idEntidad");
		consulta.setParameter("idEntidad", id);
		List<T> resultado = consulta.getResultList();
		if (resultado.isEmpty()) {
			return null;
		} else {
			return (T) resultado.get(0);
		}
	}

}
