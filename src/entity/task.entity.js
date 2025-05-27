"use strict";
import { EntitySchema } from "typeorm";

const TaskSchema = new EntitySchema({
    name: "Task",
    tableName: "tasks",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        description: {
            type: "text",
            nullable: true,
        },
        completed: {
            type: "boolean",
            default: false,
        }
    }
});

export default TaskSchema;