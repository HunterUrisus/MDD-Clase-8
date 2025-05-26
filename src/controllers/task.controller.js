import pool from "../db.js";

export async function getTasks(req, res) {
  try {
    const resultado = await pool.query("SELECT * FROM tareas ORDER BY id ASC");
    res.json(resultado.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "No se pudo procesar la solicitud", error: error });
  }
}

export async function createTask(req, res) {
  const { id, titulo } = req.body;
  try {
    const resultado = await pool.query(
      "INSERT INTO tareas VALUES ($1, $2) RETURNING *",
      [id, titulo]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "No se pudo procesar la solicitud" });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { titulo, completada } = req.body;
  try {
    const resultado = await pool.query(
      "UPDATE tareas SET titulo = $1, completada = $2 WHERE id = $3 RETURNING *",
      [titulo, completada, id]
    );
    if (resultado.rowCount === 0)
      return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
}

export async function deleteTask(req, res) {
    const { id } = req.params;
    try {
        const resultado = await pool.query("DELETE FROM tareas WHERE id = $1", [id]);
        if (resultado.rowCount === 0)
            return res.status(404).json({ error: "Tarea no encontrada" });

        res.status(204).json({ message: "Tarea eliminada" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
}
