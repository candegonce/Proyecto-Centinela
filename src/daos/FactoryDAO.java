package daos;

public class FactoryDAO {
	
	public static UsuarioDAOImp getUsuarioDAO () {
		return new UsuarioDAOImp();
	}
	
	public static UbicacionDAOImp getUbicacionDAO () {
		return new UbicacionDAOImp();
	}
	
	public static SensorDAOImp getSensorDAO () {
		return new SensorDAOImp();
	}
	
	public static MedicionDAOImp getMedicionDAO () {
		return new MedicionDAOImp();
	}

}
