import { AppDataSource } from "../config/configDb.js";
import TaskSchema from "../entity/task.entity.js";

const taskRepository = AppDataSource.getRepository(TaskSchema);

export async function getTasks(req, res) {
  try {
    const tasks = await taskRepository.find({ order: { id: "ASC" } });

    res
      .status(200)
      .json({ message: "Tareas encontradas con éxito: ", data: tasks });
  } catch (error) {
    console.log("Error al obtener las tareas: ", error);
    res.status(500).json({ message: "Error al obtener tareas", error });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const newTask = taskRepository.create({ title, description });
    const savedTask = await taskRepository.save(newTask);

    res
      .status(201)
      .json({ message: "Tarea creada con éxito", data: savedTask });
  } catch (error) {
    console.log("Error al crear la tarea: ", error);
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await taskRepository.findOneBy({ id: parseInt(id) })
    if (!task) {
      return res.status(404).json({ message:"Tarea no encontrada" })
    }

    await taskRepository.remove(task);
    res.status(200).json({ message: "Tarea eliminada con éxito" });

  } catch (error) {
    console.log("Error al eliminar tarea", error);
    res.status(500).json({ message: "Error al eliminar tarea", error})
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await taskRepository.findOneBy({ id: parseInt(id) });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" })
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await taskRepository.save(task);
    res.status(200).json({ message: "Tarea actualizada con éxito", data: updatedTask })

  } catch (error) {
    console.log("Error al actualizar tarea", error);
    res.status(500).json({ message: "Error al actualizar tarea", error})
  }
}
