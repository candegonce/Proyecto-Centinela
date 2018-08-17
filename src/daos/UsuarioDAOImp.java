package daos;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import conexion.EMF;
import modelos.Usuario;

public class UsuarioDAOImp extends GenericDAOImp<Usuario> implements UsuarioDAO {

	public UsuarioDAOImp() {
		super(Usuario.class);
	}

	@Override
	public boolean existeUsuario(String mail) {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta= em.createQuery("from " + this.getPersistentClass().getSimpleName() + " where email= :mail");
		consulta.setParameter("mail", mail);
		if (consulta.getResultList().size() == 0) {
			return false;
		}else {
			return true;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Usuario loginUsuario(String mail, String pass) {
		EntityManager em = EMF.getEMF().createEntityManager();
		Query consulta = em.createQuery(
				"from " + this.getPersistentClass().getSimpleName() + " where mail= :mail and pass = :pass");
		consulta.setParameter("mail", mail);
		consulta.setParameter("pass", pass);
		List<Usuario> result = consulta.getResultList();
		if (result.isEmpty()) {
			return null;
		} else {
			return result.get(0);
		}
	}
}
