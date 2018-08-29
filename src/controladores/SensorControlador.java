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

	// Listo todos los sensores
	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Sensor> listar() {
		List<Sensor> sensores = sdao.listar();
		if (sensores.isEmpty()) {
			System.out.println("No hay sensores.");
			return null;
		} else {
			return sensores;
		}
	}

	// Obtengo un sensor por id
	@GET
	@Path("/obtener/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Sensor obtenerSensor(@PathParam("id") long id) {
		Sensor sen = sdao.encontrarPorId((int) id);
		if (sen == null) {
			System.out.println("Sensor con id " + id + " no encontrado.");
			return null;
		} else {
			System.out.println("Retorno sensor con id: " + id);
			return sen;
		}
	}

	// Obtengo el id de un sensor segun el codigo. Si no se encuentra devuelve -1
	@GET
	@Path("/obtenerId/{codigo}")
	@Produces(MediaType.APPLICATION_JSON)
	public long obtenerSensor(@PathParam("codigo") int codigo) {
		Sensor sen = sdao.encontrarPorCodigo(codigo);
		if (sen == null) {
			System.out.println("Sensor con codigo " + codigo + " no encontrado.");
			return -1;
		} else {
			System.out.println("Retorno sensor con codigo: " + codigo);
			return sen.getIdSensor();
		}
	}

	@PUT
	@Path("/editar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editar(Sensor sensor) {
		System.out.println(sensor.getIdSensor());
		Sensor s = sdao.encontrarPorId(sensor.getIdSensor());
		if (s != null) {
			if (s.getCodigo() != sensor.getCodigo()) {
				if (sdao.existeSensor(sensor.getCodigo())) {
					System.out.println("El sensor con el codigo ingresado ya existe.");
					return Response.status(Response.Status.CONFLICT).build();
				}
			}
			System.out.println("Actualizando...");
			sdao.actualizar(sensor);
			return Response.ok().entity(sensor).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@POST
	@Path("/crear")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response crear(Sensor sensor) {
		if (sdao.existeSensor(sensor.getCodigo())) {
			System.out.println("El sensor con el codigo ingresado ya existe.");
			return Response.status(Response.Status.CONFLICT).build();
		} else {
			sdao.persistir(sensor);
			System.out.println("El sensor se creo correctamente.");
			return Response.status(Response.Status.CREATED).build();
		}
	}

	@DELETE
	@Path("/borrar/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response borrar(@PathParam("id") Integer id) {
		Sensor s = sdao.encontrarPorId(id);
		if (s != null) {
			sdao.borrar(s);
			System.out.println("El sensor se elimino correctamente.");
			return Response.noContent().build();
		} else {
			System.out.println("Sensor no encontrado.");
			return Response.status(Response.Status.NOT_FOUND).entity("No existe el sensor con ese id.").build();
		}
	}
}
