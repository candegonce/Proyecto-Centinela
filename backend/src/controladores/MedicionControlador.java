package controladores;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;
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
import daos.MedicionDAOImp;
import modelos.Medicion;

@Path("/mediciones")
public class MedicionControlador {

	private MedicionDAOImp mdao = FactoryDAO.getMedicionDAO();

	// Listo todas las mediciones
	@GET
	@Path("/listar")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Medicion> listar() {
		List<Medicion> mediciones = mdao.listar();
		if (mediciones.isEmpty()) {
			System.out.println("No hay mediciones.");
			return null;
		} else {
			return mediciones;
		}
	}

	// Obtengo todas las mediciones que realizo un sensor
	@GET
	@Path("/medicionesSensor/{idSensor}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Medicion> medicionesSensor(@PathParam("idSensor") long idSensor) {
		List<Medicion> mediciones = mdao.obtenerMedicionesSensor(idSensor);
		if (mediciones.isEmpty()) {
			System.out.println("No hay mediciones para el Sensor con id: " + idSensor);
			return null;
		} else {
			Collections.sort(mediciones);
			return mediciones;
		}
	}

	// Obtengo una medicion
	@GET
	@Path("/obtener/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Medicion obtenerMedicion(@PathParam("id") long id) {
		Medicion med = mdao.encontrarPorId((int) id);
		if (med == null) {
			System.out.println("Medicion con id " + id + " no encontrada.");
			return null;
		} else {
			System.out.println("Retorno medicion: " + med.getIdMedicion());
			return med;
		}
	}

	@PUT
	@Path("/editar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editar(Medicion medicion) {
		System.out.println(medicion.getIdMedicion());
		Medicion m = mdao.encontrarPorId(medicion.getIdMedicion());
		if (m != null) {
			System.out.println("Actualizando...");
			mdao.actualizar(medicion);
			return Response.ok().entity(medicion).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@POST
	@Path("/crear")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response crear(Medicion medicion) {
		
		SimpleDateFormat sdf = new SimpleDateFormat();
		String strDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
        Date fecha = new Date();
        try 
        {  
        	fecha = sdf.parse(strDate);  
            System.out.println("La fecha es: "+fecha);  
        } 
        catch (ParseException e) 
        {
            e.printStackTrace();
        }  
        
		medicion.setFecha(fecha);
		mdao.persistir(medicion);
		System.out.println("La medicion se creo correctamente.");
		return Response.status(Response.Status.CREATED).build();
	}

	@DELETE
	@Path("/borrar/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response borrar(@PathParam("id") Integer id) {
		Medicion m = mdao.encontrarPorId(id);
		if (m != null) {
			mdao.borrar(m);
			return Response.noContent().build();
		} else {
			System.out.println("Medicion no encontrada.");
			return Response.status(Response.Status.NOT_FOUND).entity("No existe la medicion con ese id.").build();
		}
	}
}
