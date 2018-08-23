package controladores;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import daos.FactoryDAO;
import daos.UsuarioDAOImp;
import modelos.Usuario;

@Path("/usuarios")
public class UsuarioControlador {
	
	
	private UsuarioDAOImp udao = FactoryDAO.getUsuarioDAO();
	
	//Listo todos los usuarios
	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Usuario> listar(){
		List<Usuario> usuarios = udao.listar();
		if (usuarios.isEmpty()) {
			System.out.println("No hay usuarios.");
			return null;
		}else {
			return usuarios;
		}
	}
	
	//Obtengo un usuario 
	@GET
	@Path("/obtener/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Usuario obtenerUsuario(@PathParam("id") long id) {
		Usuario usu= udao.encontrarPorId((int) id); 
		if (usu == null) {
			System.out.println("Usuario con id " + id + " no encontrado");
			return null;
		}else {
			System.out.println("Retorno usuario: " + usu.getApeynom());
			return usu;
		}
	}
	
//	Actualizado un usuario dado mediante el id
	@PUT
	@Path("/editar/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editarUsuario(@PathParam("id") int id, Usuario usuario){
		 System.out.println(usuario.getIdUsuario());
		 Usuario u = udao.encontrarPorId(id);
		 if (u != null) {
			 System.out.println("Actualizando...");
//				 u.setEmail(usuario.getEmail());
				 u.setApeynom(usuario.getApeynom());
				 u.setSexo(usuario.getSexo());
				 u.setPassword(usuario.getPassword());
				 u.setHabilitado(usuario.isHabilitado());
				 udao.actualizar(u);
				 return Response.ok().entity(usuario).build();
		 } else {
			 return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		 }
	}
	
	
//	Creo un usuario
	@POST
	@Path("/crear")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response crear(Usuario usuario){
		if(udao.existeUsuario(usuario.getEmail())) {
			 return Response.status(Response.Status.CONFLICT).build();
		}else {
			udao.persistir(usuario);
			return Response.status(Response.Status.CREATED).build();
		}
	 }
	
//	Elimino un usuario
	@DELETE
	@Path("/borrar/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response borrar(@PathParam("id") Integer id){
		Usuario aux = udao.encontrarPorId(id);
		if (aux != null){
			udao.borrar(aux);
			return Response.noContent().build();
		} else {
			String mensaje = "No existe el usuario con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
	
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_PLAIN)
	public Response loginUsuario(Usuario usuario) {
			Usuario result= udao.loginUsuario(usuario.getEmail(),usuario.getPassword());
			if (result == null) {
				String mensaje = "Usuario y/o contraseña incorrecto";
	   			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
	   		}else {   
	   			System.out.println("Usuario logueado");
	   			return Response.status(Response.Status.ACCEPTED).build();
	   		}
	}	
	
}
