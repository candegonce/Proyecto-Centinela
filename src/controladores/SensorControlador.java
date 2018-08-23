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
import daos.SensorDAOImp;
import modelos.Sensor;



@Path("/sensores")
public class SensorControlador {
	
	
	private SensorDAOImp sdao = FactoryDAO.getSensorDAO();
	
	//Listo todos los sensores
	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Sensor> listar(){
		List<Sensor> sensores = sdao.listar();
		if (sensores.isEmpty()) {
			System.out.println("No hay sensores.");
			return null;
		}else {
			return sensores;
		}
	}
	
	//Obtengo un sensor
	@GET
	@Path("/obtener/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Sensor obtenerSensor(@PathParam("id") long id) {
		Sensor sen= sdao.encontrarPorId((int) id); 
		if (sen == null) {
			System.out.println("Sensor con id " + id + " no encontrado");
			return null;
		}else {
			System.out.println("Retorno sensor: " + sen.getNombreSensor());
			return sen;
		}
	}
	

	@PUT
	@Path("/editar/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editar(@PathParam("id") int id, Sensor sensor){
		 System.out.println(sensor.getIdSensor());
		 Sensor s = sdao.encontrarPorId(id);
		 if (s != null) {
			 System.out.println("Actualizando...");
			 	 s.setBateria(sensor.getBateria());
			 	 s.setCodigo(sensor.getCodigo());
			 	 s.setEstado(sensor.getEstado());
			 	 s.setNombreSensor(sensor.getNombreSensor());
			 	 s.setUbicacion(sensor.getUbicacion());
				 sdao.actualizar(s);
				 return Response.ok().entity(sensor).build();
		 } else {
			 return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		 }
	}
	
	

	@POST
	@Path("/crear")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response crear(Sensor sensor){
		if(sdao.existeSensor(sensor.getCodigo())) {
			 return Response.status(Response.Status.CONFLICT).build();
		}else {
			sdao.persistir(sensor);
			return Response.status(Response.Status.CREATED).build();
		}
	 }
	

	@DELETE
	@Path("/borrar/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response borrar(@PathParam("id") Integer id){
		Sensor s = sdao.encontrarPorId(id);
		if (s != null){
			sdao.borrar(s);
			return Response.noContent().build();
		} else {
			String mensaje = "No existe el sensor con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
}
