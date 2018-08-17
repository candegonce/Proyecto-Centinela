package enumerativos;

public enum Estado {
	ACTIVO("Activo"), INACTIVO("Inactivo");

	private String nombre;

	private Estado(String nom) {
		this.nombre = nom;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}
