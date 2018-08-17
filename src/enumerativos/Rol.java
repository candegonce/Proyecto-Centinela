package enumerativos;

public enum Rol {
	ADMINISTRADOR("Administrador"), USUARIO("Usuario");

	private String nombre;

	private Rol(String nom) {
		this.nombre = nom;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}