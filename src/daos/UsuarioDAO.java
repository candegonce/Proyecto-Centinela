package daos;

import modelos.Usuario;

public interface UsuarioDAO extends GenericDAO<Usuario>{
	public boolean existeUsuario(String email);
	public Usuario loginUsuario(String mail, String pass);

}
