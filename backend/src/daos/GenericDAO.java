package daos;

import java.util.List;



public interface GenericDAO<T> {
		public void borrar(T entity);
		public void borrarTodos();
		public T actualizar(T entity);
		public T persistir(T entity);
		public List<T> listar();
		public List<T> recuperarTodosOrdenados(String columnOrder);
		public T encontrarPorId(long id);
}
